function Nextmonth_and_Sheetset() {

  // 実行日の取得
  let dateToday = new Date();

  // 翌月の月を取得 → 整形
  let nextMonth = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 1);

  // 作成するシートの名前用
  let sheetName = Utilities.formatDate(nextMonth, "JST", "yyyy/MM");

  // 翌月末の最終日の取得 → 整形
  let nextmonthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth()+2, 0);
  let nextmonthLastday = Utilities.formatDate(nextmonthEndDate, "JST", "d");

  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActiveSheet();
  let newSheet = spreadSheet.insertSheet(sheetName).activate();
  let numberOfSheet = spreadSheet.getNumSheets();
  spreadSheet.moveActiveSheet(numberOfSheet);


  let dayName_jpn = ["日", "月", "火", "水", "木", "金", "土"];

  for(let i=1; i<=nextmonthLastday; i++){
    let nextmonthDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);

    // 曜日の数値を取得
    let dayOfWeek = nextmonthDate.getDay(); 

    // シートの1列目に曜日を記載
    newSheet.getRange(2+i*1, 1).setValue(Utilities.formatDate(nextmonthDate, "JST", "M月d日") + "（" + dayName_jpn[dayOfWeek] +"）");
  }

  newSheet.getRange(1,2).setValue("05:00～");
  newSheet.getRange(1,3).setValue("08:00～");
  newSheet.getRange(1,4).setValue("11:00～");
  newSheet.getRange(1,5).setValue("14:00～");
  newSheet.getRange(1,6).setValue("17:00～");
  newSheet.getRange(1,7).setValue("20:00～");

  newSheet.getRange(2,2).setValue("モーニング");
  newSheet.getRange(2,3).setValue("サンシャイン");
  newSheet.getRange(2,4).setValue("コーヒータイム");
  newSheet.getRange(2,5).setValue("アフタヌーン");
  newSheet.getRange(2,6).setValue("イブニング");
  newSheet.getRange(2,7).setValue("ムーン");
}

function test(){
  // 実行日の取得
  let dateToday = new Date();

  // 翌月の月を取得 → 整形
  let nextMonth = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 1);
  //const nextmonthFormat = Utilities.formatDate(nextMonth, "JST", "M");

  // 作成するシートの名前用
  let sheetName = Utilities.formatDate(nextMonth, "JST", "yyyy/MM");

  // 翌月末の最終日の取得 → 整形
  let nextmonthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth()+2, 0);
  //const nextmonth_lastday = Utilities.formatDate(nextmonthEndDate, "JST", "d");
  //console.log(nextmonthEndDate);
}