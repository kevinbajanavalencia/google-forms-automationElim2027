function calculateAgeAtDate(
  birthDate,
  referenceDate
) {
  if (
    !(birthDate instanceof Date) ||
    isNaN(birthDate.getTime())
  ) {
    throw new Error("Invalid birth date.");
  }

  if (
    !(referenceDate instanceof Date) ||
    isNaN(referenceDate.getTime())
  ) {
    throw new Error("Invalid reference date.");
  }

  let age =
    referenceDate.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    referenceDate.getMonth() -
    birthDate.getMonth();

  const birthdayHasNotOccurred =
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      referenceDate.getDate() <
        birthDate.getDate()
    );

  if (birthdayHasNotOccurred) {
    age--;
  }

  return age;
}


function getQuestionsFromConfig(config) {
  return config.sections.flatMap(
    (section) => section.questions || []
  );
}


function normalizeResponseToLanguage(
  question,
  response,
  sourceLanguage,
  targetLanguage
) {
  if (
    response === null ||
    response === undefined ||
    response === ""
  ) {
    return "";
  }

  if (!question.options) {
    return response;
  }

  const sourceOptions =
    question.options[sourceLanguage];

  const targetOptions =
    question.options[targetLanguage];

  if (!sourceOptions || !targetOptions) {
    return response;
  }

  if (Array.isArray(response)) {
    return response
      .map((value) => {
        const index =
          sourceOptions.indexOf(value);

        return index >= 0
          ? targetOptions[index]
          : value;
      })
      .join(", ");
  }

  const index =
    sourceOptions.indexOf(response);

  return index >= 0
    ? targetOptions[index]
    : response;
}