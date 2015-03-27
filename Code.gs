function doGet() {
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


function getData(e) {
  var data = SpreadsheetApp.openById('SPREADSHEET KEY GOES HERE').getSheetByName('WORKSHEET NAME GOES HERE').getDataRange().getValues();
  var numberOfColumns = data[0].length;
  var studentData = new Object();  //create studentData object where we can store all the data
  studentData.grades = [];
  
  for (i=0; i< data.length; i++) {
    if (data[i][1] === e) {
      studentData.name = data[i][0];  //create name key in studentData
      studentData.number = data[i][1];  //create number key in studentData
      for (f=8; f< numberOfColumns; f++) {
        studentData.grades.push([data[0][f], data[i][f]]);  //adds everything from the gradebook into the studentData object
      }
    }
  }  
  Logger.log(studentData.grades.length);
  return studentData;  //return the studentData object to the page so that jQuery can manipulate the data on the page asynchronously 
}

//function from the template that allows the index.html page to have stylesheet/javascript in different pages
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}