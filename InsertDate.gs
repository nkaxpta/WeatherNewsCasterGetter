function Get_thismonthDate() {
  let sheet = SpreadsheetApp.getActiveSheet();

  // 実行日の日付を取得
  let dateToday = new Date();

  // 実行日の月の最終日を取得 → 整形
  let monthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 0);
  let thismonthLastday = Utilities.formatDate(monthEndDate, "JST", "d");

  let dayName_jpn = ["日", "月", "火", "水", "木", "金", "土"];

  for(let i=1; i<=thismonthLastday; i++){
    let date = new Date(dateToday.getFullYear(), dateToday.getMonth(), i);

    // 曜日の数字を取得
    let dayOfWeek = date.getDay();

    // シートの1列目に日付・曜日を記載 
    sheet.getRange(2+i*1, 1).setValue(Utilities.formatDate(date, "JST", "M月d日") + "（" + dayName_jpn[dayOfWeek] +"）");
  }
}