function getCasterData() {
  // 実行時の日付取得 → 整形
  let dateToday = new Date();
  let todayFormat = Utilities.formatDate(dateToday, "JST", "M月d日");

  // シート名指定の準備
  let sheetName = Utilities.formatDate(dateToday, "JST", "yyyy/MM");

  // 翌日の日付・月を取得 → 整形
  let dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
  let tomorrowFormat = Utilities.formatDate(dateTomorrow, "JST", "M月d日");
  let tomorrowMonth = Utilities.formatDate(dateTomorrow, "JST", "M");

  // 翌月の月を取得 → 整形
  let nextMonth = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 1);
  let nextmonthFormat = Utilities.formatDate(nextMonth, "JST", "M");

  // 翌月のシート名指定の準備
  let nextSheetName = Utilities.formatDate(nextMonth, "JST", "yyyy/MM");

  //----------------------------------------------------------------
  // スプレッドシート指定 → アクティブシートと翌月のシートの設定
  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = spreadSheet.getSheetByName(sheetName);
  let nextSheet = spreadSheet.getSheetByName(nextSheetName);

  // キャスター情報を取得するAPIの指定
  const TIMETABLE_URL = 'http://smtgvs.weathernews.jp/a/solive_timetable/timetable.json';
  //const TIMETABLE_URL = 'http://smtgvs.cdn.weathernews.jp/a/solive_timetable/timetable.json';

  //----------------------------------------------------------------
  // 指定したURLにアクセス → JSON取得 → オブジェクトに変換
  let response = UrlFetchApp.fetch(TIMETABLE_URL);
  let responseText = response.getContentText();
  let obj = JSON.parse(responseText);

  // todayとtomorrowの配列を用意
  let today = [];
  let tomorrow = [];

  //----------------------------------------------------------------
  // 取得したオブジェクトのhourからtodayとtomorrowに振り分け
  // 翌日の月が替わっていたら新たにtomorrowにmonthキーを追加
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].hour != "00:00" || (obj[i].hour == "00:00" && i == 0)) {
      obj[i].date = todayFormat;
      today.push(obj[i]);
    }
    else {
      for (let j = i; j < obj.length; j++) {
        obj[j].date = tomorrowFormat;
        if (tomorrowMonth == nextmonthFormat) {
          obj[j].month = nextmonthFormat;
        }
        tomorrow.push(obj[j]);
      }
      break;
    }
  }

  // 1列目の入力最終行を取得
  let lastRow = activeSheet.getLastRow();

  //----------------------------------------------------------------
  // シートの日付列と一致しているかどうかを精査 → 一致していれば時間を合わせて書き込み
  for (let i = 0; i < obj.length; i++) {
    for (let j = 3; j <= lastRow; j++) {
      if (activeSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "05:00") {
        activeSheet.getRange(j * 1, 2).setValue(CasterName(CasterTrans(obj[i].caster)));
      }
      else if (activeSheet.getRange(j, 1).getValue().includes(obj[i].date) && obj[i].hour == "08:00") {
        activeSheet.getRange(j * 1, 3).setValue(CasterName(CasterTrans(obj[i].caster)));
      }
      else if (activeSheet.getRange(j, 1).getValue().includes(obj[i].date) && obj[i].hour == "11:00") {
        activeSheet.getRange(j * 1, 4).setValue(CasterName(CasterTrans(obj[i].caster)));
      }
      else if (activeSheet.getRange(j, 1).getValue().includes(obj[i].date) && obj[i].hour == "14:00") {
        activeSheet.getRange(j * 1, 5).setValue(CasterName(CasterTrans(obj[i].caster)));
      }
      else if (activeSheet.getRange(j, 1).getValue().includes(obj[i].date) && obj[i].hour == "17:00") {
        activeSheet.getRange(j * 1, 6).setValue(CasterName(CasterTrans(obj[i].caster)));
      }
      else if (activeSheet.getRange(j, 1).getValue().includes(obj[i].date) && obj[i].hour == "20:00") {
        activeSheet.getRange(j * 1, 7).setValue(CasterName(CasterTrans(obj[i].caster)));
      }

      //----------------------------------------------------------------
      // tomorrowにmonthキーが追加されていれば翌月のシートへ移動し書き込み
      else if (typeof tomorrow[0] !== "undefined") {
        if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "05:00") {
          nextSheet.getRange(j * 1, 2).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
        else if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "08:00") {
          nextSheet.getRange(j * 1, 3).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
        else if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "11:00") {
          nextSheet.getRange(j * 1, 4).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
        else if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "14:00") {
          nextSheet.getRange(j * 1, 5).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
        else if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "17:00") {
          nextSheet.getRange(j * 1, 6).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
        else if (typeof tomorrow[0].month !== "undefined" && nextSheet.getRange(j * 1, 1).getValue().includes(obj[i].date) && obj[i].hour == "20:00") {
          nextSheet.getRange(j * 1, 7).setValue(CasterName(CasterTrans(obj[i].caster)));
        }
      }
    }
  }
  // 動作チェック
  //console.log(typeof tomorrow[2] == "undefined")
  //console.log(activeSheet.getRange(30,1).getValue().includes(obj[0].date));
}

//----------------------------------------------------------------
// JSON記載の名前成形
function CasterTrans(castername) {
  let name = castername;
  if (castername == "ailin") {
    name = "yamagishi";
  }
  else if (castername == "hiyama2018") {
    name = "hiyama";
  }
  else if (castername == "izumin") {
    name = "maie";
  }
  else if (castername == "komaki2018") {
    name = "komaki";
  }
  else if (castername == "matsu") {
    name = "matsuyuki";
  }
  else if (castername == "sayane") {
    name = "egawa";
  }
  return name;
}

//----------------------------------------------------------------
// キャスター名を和名に変換
function CasterName(castername) {
  let name = castername;
  if (castername == "yamagishi") {
    name = "山岸 愛梨";
  }
  else if (castername == "egawa") {
    name = "江川 清音";
  }
  else if (castername == "maie") {
    name = "眞家 泉";
  }
  else if (castername == "matsuyuki") {
    name = "松雪 彩花";
  }
  else if (castername == "shirai") {
    name = "白井 ゆかり";
  }
  else if (castername == "takayama") {
    name = "高山 奈々";
  }
  else if (castername == "hiyama") {
    name = "檜山 沙耶";
  }
  else if (castername == "komaki") {
    name = "駒木 結衣";
  }
  else if (castername == "ohshima") {
    name = "大島 璃音";
  }
  else if (castername == "tokita") {
    name = "戸北 美月";
  }
  else if (castername == "kawabata") {
    name = "川畑 玲";
  }
  else if (castername == "kobayashi") {
    name = "小林 李衣奈";
  }
  else if (castername == "uozumi") {
    name = "魚住 茉由";
  }
  else if (castername == "ogawa") {
    name = "小川 千奈";
  }
  else if (castername == "aohara2023") {
    name = "青原 桃香";
  }
  else if (castername == "okamoto2023") {
    name = "岡本 結子 リサ";
  }
  return name;
}