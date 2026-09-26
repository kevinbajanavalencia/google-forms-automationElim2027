function generateExampleSpanishForm() {
  generateExampleFormWithSpreadsheet_("es");
}


function generateExampleFrenchForm() {
  generateExampleFormWithSpreadsheet_("fr");
}


function generateExampleFormWithSpreadsheet_(language) {
  const form = buildForm(FORM_CONFIG, language);

  const spreadsheet = createResponseSpreadsheet(
    `${FORM_CONFIG.title[language]} - Responses`
  );

  connectFormToSpreadsheet(form, spreadsheet);

  return {
    form: form,
    spreadsheet: spreadsheet
  };
}