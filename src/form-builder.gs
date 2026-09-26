function buildForm(config, language) {
  if (!config.languages.includes(language)) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const form = FormApp.create(config.title[language]);

  if (config.description && config.description[language]) {
    form.setDescription(config.description[language]);
  }

  config.sections.forEach((section, sectionIndex) => {
    let sectionItem;

    if (sectionIndex === 0) {
      sectionItem = form
        .addSectionHeaderItem()
        .setTitle(section.title[language]);
    } else {
      sectionItem = form
        .addPageBreakItem()
        .setTitle(section.title[language]);
    }

    if (section.description && section.description[language]) {
      sectionItem.setHelpText(section.description[language]);
    }

    section.questions.forEach((question) => {
      addQuestionToForm_(form, question, language);
    });
  });

  Logger.log(`Form created: ${form.getEditUrl()}`);

  return form;
}


function addQuestionToForm_(form, question, language) {
  let item;

  switch (question.type) {
    case "SHORT_ANSWER":
      item = form.addTextItem();
      break;

    case "PARAGRAPH":
      item = form.addParagraphTextItem();
      break;

    case "MULTIPLE_CHOICE":
      item = form
        .addMultipleChoiceItem()
        .setChoiceValues(question.options[language]);
      break;

    case "CHECKBOXES":
      item = form
        .addCheckboxItem()
        .setChoiceValues(question.options[language]);
      break;

    case "DATE":
      item = form.addDateItem();
      break;

    default:
      throw new Error(`Unsupported question type: ${question.type}`);
  }

  item.setTitle(question.label[language]);
  item.setRequired(Boolean(question.required));
}