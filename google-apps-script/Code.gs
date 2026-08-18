const SPREADSHEET_ID = '1d5bR_FDadNgpmo5-ygRaHwgt1jSSkBPiK_LiaAA6plM';
const SHEET_NAME = 'Confirmaciones';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'America/Lima', 'dd/MM/yyyy HH:mm:ss'),
      payload.nombre || '',
      payload.asistencia || '',
      payload.acompanante || '',
      payload.nombreAcompanante || '',
      payload.mensaje || '',
      payload.evento || 'Cumpleaños de Melissa · 29/08/2026 20:00',
      payload.invitadoUrl || '',
      payload.userAgent || ''
    ]);

    return jsonResponse_({ ok: true, message: 'Confirmación registrada' });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'RSVP Melissa', spreadsheetId: SPREADSHEET_ID });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
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
      'Evento',
      'URL invitación',
      'Navegador'
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
