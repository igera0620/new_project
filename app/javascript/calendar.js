import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

function loadCalendar() {
  let calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  let calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'ja',
    events: function (fetchInfo, successCallback, failureCallback) {
      fetch('/workouts.json')
        .then(response => response.json())
        .then(data => {
          let workouts = Array.isArray(data) ? data : [data];

          let formattedData = workouts.map(event => {
            let isCompleted = event.completed === true;
            let startDate = event.start ? event.start : "";

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
          alert(data.message);
          calendar.refetchEvents();
        })
        .catch(error => {});
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
          }
        })
        .catch(error => {});
    });
  }
}

document.addEventListener('turbo:load', loadCalendar);
document.addEventListener('DOMContentLoaded', loadCalendar);
