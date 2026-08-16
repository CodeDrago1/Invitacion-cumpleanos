const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      payload.nombre || '',
      payload.asistencia || '',
      payload.acompanante || '',
      payload.nombreAcompanante || '',
      payload.mensaje || '',
      payload.invitadoUrl || '',
      payload.userAgent || ''
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'RSVP Gossip Girl' });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Fecha y hora',
      'Nombre',
      'Asistencia',
      '¿Acompañante?',
      'Nombre acompañante',
      'Mensaje',
      'URL invitación',
      'Navegador'
    ]);
  }

  return sheet;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
