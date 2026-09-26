function calculateAgeAtDate(
  birthDate,
  referenceDate
) {
  const parsedBirthDate =
    parseDateResponse_(birthDate);

  const parsedReferenceDate =
    parseDateResponse_(referenceDate);

  let age =
    parsedReferenceDate.getFullYear() -
    parsedBirthDate.getFullYear();

  const monthDifference =
    parsedReferenceDate.getMonth() -
    parsedBirthDate.getMonth();

  const birthdayHasNotOccurred =
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      parsedReferenceDate.getDate() <
        parsedBirthDate.getDate()
    );

  if (birthdayHasNotOccurred) {
    age--;
  }

  if (age < 0) {
    throw new Error(
      "Birth date cannot be after the registration date."
    );
  }

  return age;
}


function parseDateResponse_(value) {
  if (
    value instanceof Date &&
    !isNaN(value.getTime())
  ) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
  }

  if (typeof value !== "string") {
    throw new Error(
      `Invalid date value: ${value}`
    );
  }

  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
    throw new Error(
      "Date value is empty."
    );
  }

  let match =
    normalizedValue.match(
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    );

  if (match) {
    return createValidatedDate_(
      Number(match[1]),
      Number(match[2]),
      Number(match[3])
    );
  }

  match =
    normalizedValue.match(
      /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/
    );

  if (match) {
    const firstPart =
      Number(match[1]);

    const secondPart =
      Number(match[2]);

    const year =
      Number(match[3]);

    if (
      secondPart > 12 &&
      firstPart <= 12
    ) {
      return createValidatedDate_(
        year,
        firstPart,
        secondPart
      );
    }

    return createValidatedDate_(
      year,
      secondPart,
      firstPart
    );
  }

  throw new Error(
    `Unsupported date format: ${normalizedValue}`
  );
}


function createValidatedDate_(
  year,
  month,
  day
) {
  const date =
    new Date(
      year,
      month - 1,
      day
    );

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValid) {
    throw new Error(
      `Invalid date: ${year}-${month}-${day}`
    );
  }

  return date;
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