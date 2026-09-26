function createAdministrativeSpreadsheet(
  title,
  sheetName,
  headers
) {
  const spreadsheet =
    SpreadsheetApp.create(title);

  const sheet =
    spreadsheet.getSheets()[0];

  sheet.setName(sheetName);

  initializeAdministrativeSheet_(
    sheet,
    headers
  );

  Logger.log(
    `Spreadsheet created: ${spreadsheet.getUrl()}`
  );

  return spreadsheet;
}


function resetAdministrativeSheet(
  spreadsheetId,
  sheetName,
  headers
) {
  const spreadsheet =
    SpreadsheetApp.openById(
      spreadsheetId
    );

  let sheet =
    spreadsheet.getSheetByName(
      sheetName
    );

  if (!sheet) {
    sheet =
      spreadsheet.insertSheet(
        sheetName
      );
  }

  initializeAdministrativeSheet_(
    sheet,
    headers
  );

  Logger.log(
    `Administrative sheet reset: ${spreadsheet.getUrl()}`
  );

  return sheet;
}


function appendAdministrativeRow(
  spreadsheetId,
  sheetName,
  rowValues
) {
  const spreadsheet =
    SpreadsheetApp.openById(
      spreadsheetId
    );

  const sheet =
    spreadsheet.getSheetByName(
      sheetName
    );

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


function initializeAdministrativeSheet_(
  sheet,
  headers
) {
  sheet.clear();
  sheet.clearFormats();

  ensureSheetHasEnoughColumns_(
    sheet,
    headers.length
  );

  sheet
    .getRange(
      1,
      1,
      1,
      headers.length
    )
    .setValues([headers]);

  formatAdministrativeSheet_(
    sheet,
    headers.length
  );
}


function ensureSheetHasEnoughColumns_(
  sheet,
  requiredColumnCount
) {
  const currentColumnCount =
    sheet.getMaxColumns();

  if (
    currentColumnCount <
    requiredColumnCount
  ) {
    sheet.insertColumnsAfter(
      currentColumnCount,
      requiredColumnCount -
        currentColumnCount
    );
  }
}


function formatAdministrativeSheet_(
  sheet,
  columnCount
) {
  const headerRange =
    sheet.getRange(
      1,
      1,
      1,
      columnCount
    );

  headerRange
    .setFontWeight("bold")
    .setFontColor("#ffffff")
    .setBackground("#1a73e8")
    .setHorizontalAlignment(
      "center"
    )
    .setVerticalAlignment(
      "middle"
    )
    .setWrap(true);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 44);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }

  headerRange.createFilter();

  for (
    let column = 1;
    column <= columnCount;
    column++
  ) {
    let width = 190;

    if (column === 1) {
      width = 160;
    }

    if (column === 2) {
      width = 90;
    }

    if (column === 3) {
      width = 70;
    }

    sheet.setColumnWidth(
      column,
      width
    );
  }

  if (
    sheet.getMaxRows() > 1
  ) {
    const bodyRange =
      sheet.getRange(
        2,
        1,
        sheet.getMaxRows() - 1,
        columnCount
      );

    bodyRange
      .setWrap(true)
      .setVerticalAlignment(
        "top"
      );
  }
}