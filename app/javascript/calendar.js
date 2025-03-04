import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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
      contentHeight: "auto", // 高さを自動調整
      aspectRatio: 1, // カレンダーの縦横比を調整
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      events: function (fetchInfo, successCallback, failureCallback) {
        fetch('/workouts.json')
          .then(response => response.json())
          .then(data => {
            let workouts = Array.isArray(data) ? data : [data];

            let formattedData = workouts.map(event => ({
              id: event.id,
              title: event.completed ? "✅ " + event.title : event.title,
              start: event.start || "",
              allDay: true,
              classNames: event.completed ? ['workout-completed'] : ['workout-incomplete']
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
      
        if (confirm(`🗑️ "${event.title}" を削除しますか？`)) {
          info.el.style.pointerEvents = "none";
      
          fetch(`/workouts/${event.id}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(errData => {
                throw new Error(errData.message || `HTTP ${response.status}`);
              }).catch(() => {
                throw new Error(`HTTP ${response.status}`);
              });
            }
            return response.json();
          })
          .then(data => {
            alert(data.message);

            let removedEvent = calendar.getEventById(event.id);
            if (removedEvent) {
              removedEvent.remove();
            }
      
            calendar.refetchEvents();
          })
          .catch(error => {
            alert(`削除に失敗しました: ${error.message || "不明なエラー"}`);
            info.el.style.pointerEvents = "auto";
          });
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

document.addEventListener('turbo:load', loadCalendar);
