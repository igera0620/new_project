import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { showWorkoutDetailModal } from './modal';

function loadCalendar() {
  let calendarElements = document.querySelectorAll("#calendar-pc, #calendar-mobile");

  if (calendarElements.length === 0) {
    console.error("カレンダーの要素が見つかりません！");
    return;
  }

  calendarElements.forEach(calendarEl => {

    let calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'ja',
      contentHeight: "auto",
      aspectRatio: 1,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      events: function (fetchInfo, successCallback, failureCallback) {
        fetch('/workouts.json')
          .then(response => {
            if (response.redirected) {
              console.log("✅ サーバーからリダイレクト指示を受けた:", response.url);
              window.location.href = response.url;
              return;
            }
            return response.json();
          })
          .then(data => {
            if (!data) return;
      
            let completedTitles = new Set(
              data.filter(event => event.completed).map(event => `${event.title}-${event.start}`)
            );
      
            let formattedData = data
              .filter(event => event.title)
              .map(event => ({
                id: event.id,
                title: completedTitles.has(`${event.title}-${event.start}`) ? `💪 ${event.title}` : event.title,
                start: event.start || "",
                allDay: true,
                completed: event.completed || false
              }));
            successCallback(formattedData);
          })
          .catch(error => {
            console.error("イベントデータの取得に失敗:", error);
            failureCallback(error);
          });            
      },
      editable: true,

      eventClick: function (info) {
        let event = info.event;
      
        // 🔥 ユーザーに詳細表示の確認
        if (confirm(`"${event.title}" の詳細を表示しますか？`)) {
          // 🔥 確認後に詳細ページへ遷移
          window.location.href = `/workouts/${event.id}`;
        }
      }            
    });

    calendar.render();
    console.log("カレンダーがレンダリングされました！", calendar);
  });

  // CSS を JavaScript から追加
  if (!document.querySelector("#fullcalendar-style")) {
    const style = document.createElement("style");
    style.id = "fullcalendar-style";
    style.innerHTML = `
      /* モバイルカレンダーの調整 */
      #calendar-mobile {
        max-width: 100%;
        padding: 8px;
      }

      /* ヘッダー部分（ナビゲーションボタンやタイトル） */
      .fc-header-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }

      .fc-button {
        font-size: 12px !important;
        padding: 4px 8px !important;
        height: 30px;
        border-radius: 4px !important;
      }

      /* カレンダーのマス目のサイズ調整 */
      .fc-daygrid-day {
        min-height: 50px !important; /* 1日の枠の高さを統一 */
      }

      .fc-daygrid-day-top {
        font-size: 12px !important; /* 日付のフォントサイズを小さく */
      }

      /* イベントのデザイン */
      .fc-daygrid-event {
        font-size: 10px !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
        text-align: center;
      }

      /* イベントの背景色を調整 */
      .fc-event {
        background-color: #60A5FA !important; /* 水色にする */
        color: white !important;
        border: none !important;
      }

      .fc-daygrid-day-number {
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }
}

function showDetailButton(data) {
  let detailEl = document.getElementById("workoutDetail");

  detailEl.innerHTML = `
    <h3>${data.title || "タイトルなし"}</h3>
    <button id="showDetailBtn" class="mt-2 p-2 bg-blue-500 text-white rounded-lg">詳細を表示</button>
  `;

  document.getElementById("showDetailBtn").addEventListener("click", function() {
    showWorkoutDetailModal(data);
  });

  detailEl.style.display = "block";
}

document.addEventListener('turbo:load', loadCalendar);
