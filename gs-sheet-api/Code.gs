var API_KEY = '<< ---- API_KEY ---- >>';
var Sheet_Name = 'posts';

function doPost(e){
  var ss = SpreadsheetApp.openById(API_KEY);
  var sheet = ss.getSheetByName(Sheet_Name);
  var id = sheet.getLastRow();
  var holder = JSON.parse(e.parameter.data);
  var newRow = [id, holder[0], holder[1]]
  sheet.appendRow(newRow);
  
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'post': newRow,
  }));
}

function doGet(e){
  var data = {
    status: 'success',
    posts: myData()
  };
  var output = JSON.stringify(data);
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function myData() {
  var ss = SpreadsheetApp.openById(API_KEY);
  var sheet = ss.getSheetByName(Sheet_Name);
  var rows = sheet.getDataRange().getValues();
  
  var posts = rows.slice(1);
  return posts;
}
