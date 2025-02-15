import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

function loadCalendar() {
  let calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  console.log("📅 カレンダーをロード中...");

  let calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'ja',
    events: function (fetchInfo, successCallback, failureCallback) {
      fetch('/workouts.json')
        .then(response => response.json())
        .then(data => {
          console.log("📅 取得したワークアウトデータ:", data);

          // 🔽 dataがオブジェクトだった場合は配列に変換
          let workouts = Array.isArray(data) ? data : [data];

          let formattedData = workouts.map(event => {
            let isCompleted = event.completed === true;
            let startDate = event.start ? event.start : "";
            console.log(`✅ イベントID: ${event.id}, タイトル: ${event.title}, 完了ステータス: ${isCompleted}`);

            return {
              id: event.id,
              title: isCompleted ? "✅ " + event.title : event.title,
              start: startDate,
              allDay: true,
              classNames: isCompleted ? ['workout-completed'] : ['workout-incomplete']
            };
          });

          successCallback(formattedData);
        })
        .catch(error => {
          console.error("📅 カレンダーデータ取得エラー:", error);
          failureCallback(error);
        });
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    editable: true,

    eventClick: function (info) {
      let event = info.event;
      console.log("✅ 削除するイベントID:", event.id);
    
      if (confirm(`🗑️ "${event.title}" を削除しますか？`)) {
        console.log("🚀 削除リクエスト送信: /workouts/" + event.id);
    
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
            // ❌ HTTPエラーが発生した場合、エラーメッセージを投げる
            return response.json().then(errData => {
              throw new Error(errData.message || `HTTP ${response.status}`);
            }).catch(() => {
              throw new Error(`HTTP ${response.status}`);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log("✅ 削除成功:", data);
          alert(data.message);
    
          // 🔽 カレンダーからイベントを削除
          let removedEvent = calendar.getEventById(event.id);
          if (removedEvent) {
            console.log("✅ カレンダーから削除:", event.id);
            removedEvent.remove();
          }
    
          calendar.refetchEvents(); // 🔽 カレンダーのイベントを再読み込み
        })
        .catch(error => {
          console.error('❌ 削除エラー:', error.message || error);
          alert(`削除に失敗しました: ${error.message || "不明なエラー"}`);
    
          // 🔽 失敗時にボタンの無効化を解除
          info.el.style.pointerEvents = "auto";
        });
      }
    }
  });

  calendar.render();

  // ✅ カレンダーのスタイルを追加
  const style = document.createElement("style");
  style.innerHTML = `
    .fc-daygrid-event {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2px;
      width: auto;
      border-radius: 5px;
    }

    .workout-completed {
      background-color: #4caf50 !important;
      color: white !important;
    }

    .workout-incomplete {
      background-color: #87cefa !important;
      color: black !important;
    }
  `;
  document.head.appendChild(style);

  // ✅ フィードバック送信後にカレンダーを更新
  document.addEventListener('submit', function (event) {
    if (event.target.matches('#feedback-form')) {
      event.preventDefault();

      let formData = new FormData(event.target);

      fetch('/workouts/submit_feedback', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log("📅 フィードバック送信後のデータ:", data);
          alert(data.message);
          calendar.refetchEvents();
        })
        .catch(error => console.error('エラー:', error));
    }
  });

  let generateButton = document.getElementById('generate-menu-button');
  if (generateButton) {
    generateButton.addEventListener('click', function () {
      fetch('/generate_menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ body_part: "腕", referrer: window.location.href })
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          if (data.redirect_url) {
            window.location.href = data.redirect_url;
          } else {
            console.warn("⚠️ `redirect_url` が返されていません！");
          }
        })
        .catch(error => console.error('エラー:', error));
    });
  }
}

// ✅ Turbo対応（ページ遷移後にも確実にカレンダーを表示）
document.addEventListener('turbo:load', loadCalendar);
document.addEventListener('DOMContentLoaded', loadCalendar);
