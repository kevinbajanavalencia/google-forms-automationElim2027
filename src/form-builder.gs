function buildForm(config, language) {
  validateLanguage_(config, language);

  const form =
    FormApp.create(config.title[language]);

  populateForm_(
    form,
    config,
    language
  );

  Logger.log(
    `Form created: ${form.getEditUrl()}`
  );

  return form;
}


function rebuildForm(
  form,
  config,
  language
) {
  validateLanguage_(config, language);

  const items =
    form.getItems();

  for (
    let index = items.length - 1;
    index >= 0;
    index--
  ) {
    form.deleteItem(index);
  }

  populateForm_(
    form,
    config,
    language
  );

  Logger.log(
    `Form rebuilt: ${form.getEditUrl()}`
  );

  return form;
}


function populateForm_(
  form,
  config,
  language
) {
  form.setTitle(
    config.title[language]
  );

  if (
    config.description &&
    config.description[language]
  ) {
    form.setDescription(
      config.description[language]
    );
  }

  if (
    config.confirmationMessage &&
    config.confirmationMessage[language]
  ) {
    form.setConfirmationMessage(
      config.confirmationMessage[language]
    );
  }

  form.setProgressBar(
    Boolean(config.showProgressBar)
  );

  const sectionItems = {};
  const navigationQuestions = [];

  config.sections.forEach(
    (section, sectionIndex) => {
      let sectionItem;

      if (sectionIndex === 0) {
        sectionItem =
          form
            .addSectionHeaderItem()
            .setTitle(
              section.title[language]
            );
      } else {
        sectionItem =
          form
            .addPageBreakItem()
            .setTitle(
              section.title[language]
            );

        sectionItems[
          section.id
        ] = sectionItem;
      }

      if (
        section.description &&
        section.description[language]
      ) {
        sectionItem.setHelpText(
          section.description[language]
        );
      }

      section.questions.forEach(
        (question) => {
          const item =
            addQuestionToForm_(
              form,
              question,
              language
            );

          if (question.navigation) {
            navigationQuestions.push({
              item: item,
              question: question
            });
          }
        }
      );
    }
  );

  navigationQuestions.forEach(
    ({ item, question }) => {
      applyQuestionNavigation_(
        item,
        question,
        language,
        sectionItems
      );
    }
  );
}


function addQuestionToForm_(
  form,
  question,
  language
) {
  let item;

  switch (question.type) {
    case "SHORT_ANSWER":
      item =
        form.addTextItem();
      break;

    case "PARAGRAPH":
      item =
        form.addParagraphTextItem();
      break;

    case "MULTIPLE_CHOICE":
      item =
        form
          .addMultipleChoiceItem()
          .setChoiceValues(
            question.options[language]
          );
      break;

    case "CHECKBOXES":
      item =
        form
          .addCheckboxItem()
          .setChoiceValues(
            question.options[language]
          );
      break;

    case "DATE":
      item =
        form.addDateItem();
      break;

    default:
      throw new Error(
        `Unsupported question type: ${question.type}`
      );
  }

  item.setTitle(
    question.label[language]
  );

  item.setRequired(
    Boolean(question.required)
  );

  return item;
}


function applyQuestionNavigation_(
  item,
  question,
  language,
  sectionItems
) {
  if (
    question.type !==
    "MULTIPLE_CHOICE"
  ) {
    throw new Error(
      `Navigation is only supported for MULTIPLE_CHOICE questions: ${question.id}`
    );
  }

  const options =
    question.options[language];

  const navigation =
    question.navigation;

  if (
    options.length !==
    navigation.length
  ) {
    throw new Error(
      `Navigation configuration does not match options for: ${question.id}`
    );
  }

  const choices =
    options.map(
      (option, index) => {
        const destination =
          navigation[index];

        if (
          destination === "SUBMIT"
        ) {
          return item.createChoice(
            option,
            FormApp
              .PageNavigationType
              .SUBMIT
          );
        }

        if (
          destination === "CONTINUE"
        ) {
          return item.createChoice(
            option,
            FormApp
              .PageNavigationType
              .CONTINUE
          );
        }

        const targetSection =
          sectionItems[destination];

        if (!targetSection) {
          throw new Error(
            `Navigation target not found: ${destination}`
          );
        }

        return item.createChoice(
          option,
          targetSection
        );
      }
    );

  item.setChoices(choices);
}


function validateLanguage_(
  config,
  language
) {
  if (
    !config.languages.includes(
      language
    )
  ) {
    throw new Error(
      `Unsupported language: ${language}`
    );
  }
}