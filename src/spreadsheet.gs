function createResponseSpreadsheet(title) {
  const spreadsheet = SpreadsheetApp.create(title);

  Logger.log(`Spreadsheet created: ${spreadsheet.getUrl()}`);

  return spreadsheet;
}


function connectFormToSpreadsheet(form, spreadsheet) {
  form.setDestination(
    FormApp.DestinationType.SPREADSHEET,
    spreadsheet.getId()
  );

  Logger.log(`Form connected to spreadsheet: ${spreadsheet.getUrl()}`);

  return spreadsheet;
}