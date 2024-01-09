function Nextmonth_and_Sheetset() {

  // 実行日の取得
  const dateToday = new Date();

  // 翌月の月を取得 → 整形
  const nextMonth = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 1);

  // 作成するシートの名前用
  const sheetName = Utilities.formatDate(nextMonth, "JST", "yyyy/MM");

  // 翌月末の最終日の取得 → 整形
  const nextmonthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth()+2, 0);
  const nextmonthLastday = Utilities.formatDate(nextmonthEndDate, "JST", "d");

  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SpreadsheetApp.getActiveSheet();
  const newSheet = spreadSheet.insertSheet(sheetName).activate();
  const numberOfSheet = spreadSheet.getNumSheets();
  spreadSheet.moveActiveSheet(numberOfSheet);


  const dayName_jpn = ["日", "月", "火", "水", "木", "金", "土"];

  for(let i=1; i<=nextmonthLastday; i++){
    const nextmonthDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);

    // 曜日の数値を取得
    const dayOfWeek = nextmonthDate.getDay(); 

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
  const dateToday = new Date();

  // 翌月の月を取得 → 整形
  const nextMonth = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 1);
  //const nextmonthFormat = Utilities.formatDate(nextMonth, "JST", "M");

  // 作成するシートの名前用
  const sheetName = Utilities.formatDate(nextMonth, "JST", "yyyy/MM");

  // 翌月末の最終日の取得 → 整形
  const nextmonthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth()+2, 0);
  //const nextmonth_lastday = Utilities.formatDate(nextmonthEndDate, "JST", "d");
  //console.log(nextmonthEndDate);
}