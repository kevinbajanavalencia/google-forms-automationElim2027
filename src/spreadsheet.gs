function createAdministrativeSpreadsheet(title, sheetName, headers) {
  const spreadsheet = SpreadsheetApp.create(title);
  const sheet = spreadsheet.getSheets()[0];

  sheet.setName(sheetName);

  initializeAdministrativeSheet_(sheet, headers);

  Logger.log(`Spreadsheet created: ${spreadsheet.getUrl()}`);

  return spreadsheet;
}


function resetAdministrativeSheet(
  spreadsheetId,
  sheetName,
  headers
) {
  const spreadsheet =
    SpreadsheetApp.openById(spreadsheetId);

  let sheet =
    spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  initializeAdministrativeSheet_(sheet, headers);

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
    .getRange(1, 1, 1, headers.length)
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

  if (currentColumnCount < requiredColumnCount) {
    sheet.insertColumnsAfter(
      currentColumnCount,
      requiredColumnCount - currentColumnCount
    );
  }
}


function formatAdministrativeSheet_(
  sheet,
  columnCount
) {
  const headerRange =
    sheet.getRange(1, 1, 1, columnCount);

  headerRange
    .setFontWeight("bold")
    .setFontColor("#ffffff")
    .setBackground("#1a73e8")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 44);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }

  headerRange.createFilter();

  for (let column = 1; column <= columnCount; column++) {
    sheet.autoResizeColumn(column);
  }

  const preferredWidths = [
    160, // Fecha de inscripción
    110, // Idioma del formulario
    70,  // Edad
    190, // Nombre participante
    130, // Fecha nacimiento
    110, // Género
    240, // Dirección
    200, // Email participante
    190, // Tutor - Nombre
    140, // Tutor - Relación
    140, // Tutor - Teléfono
    200, // Tutor - Email
    190, // Emergencia 1 - Nombre
    150, // Emergencia 1 - Relación
    150, // Emergencia 1 - Teléfono
    190, // Emergencia 2 - Nombre
    150, // Emergencia 2 - Relación
    150, // Emergencia 2 - Teléfono
    190, // Emergencia 3 - Nombre
    150, // Emergencia 3 - Relación
    150, // Emergencia 3 - Teléfono
    240, // Condición médica
    220, // Alergias
    220, // Restricciones alimentarias
    220, // Tratamiento actual
    220, // Cuidados especiales
    240, // Otra info médica
    180  // Médico tratante
  ];

  for (let i = 0; i < preferredWidths.length; i++) {
    const column = i + 1;

    if (column > columnCount) {
      break;
    }

    sheet.setColumnWidth(
      column,
      preferredWidths[i]
    );
  }

  if (sheet.getMaxRows() > 1) {
    const bodyRange = sheet.getRange(
      2,
      1,
      sheet.getMaxRows() - 1,
      columnCount
    );

    bodyRange
      .setWrap(true)
      .setVerticalAlignment("top");
  }
}