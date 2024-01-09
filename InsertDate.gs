function Get_thismonthDate() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // 実行日の日付を取得
  const dateToday = new Date();

  // 実行日の月の最終日を取得 → 整形
  const monthEndDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 0);
  const thismonthLastday = Utilities.formatDate(monthEndDate, "JST", "d");

  const dayName_jpn = ["日", "月", "火", "水", "木", "金", "土"];

  for (let i = 1; i <= thismonthLastday; i++) {
    const date = new Date(dateToday.getFullYear(), dateToday.getMonth(), i);

    // 曜日の数字を取得
    const dayOfWeek = date.getDay();

    // シートの1列目に日付・曜日を記載 
    sheet.getRange(2 + i * 1, 1).setValue(Utilities.formatDate(date, "JST", "M月d日") + "（" + dayName_jpn[dayOfWeek] + "）");
  }
}