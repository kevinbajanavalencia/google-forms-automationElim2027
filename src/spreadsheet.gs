function createAdministrativeSpreadsheet(title, sheetName, headers) {
  const spreadsheet = SpreadsheetApp.create(title);
  const sheet = spreadsheet.getSheets()[0];

  sheet.setName(sheetName);
  sheet.clear();

  sheet
    .getRange(1, 1, 1, headers.length)
    .setValues([headers]);

  sheet.setFrozenRows(1);

  Logger.log(`Spreadsheet created: ${spreadsheet.getUrl()}`);

  return spreadsheet;
}


function appendAdministrativeRow(
  spreadsheetId,
  sheetName,
  rowValues
) {
  const spreadsheet =
    SpreadsheetApp.openById(spreadsheetId);

  const sheet =
    spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      `Sheet not found: ${sheetName}`
    );
  }

  sheet.appendRow(rowValues);
}


function installFormSubmitTrigger(
  form,
  handlerFunctionName
) {
  ScriptApp
    .newTrigger(handlerFunctionName)
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log(
    `Form submit trigger installed: ${handlerFunctionName}`
  );
}