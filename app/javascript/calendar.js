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
    events: '/workouts.json',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    editable: true,
    eventColor: '#87cefa',
    eventTextColor: '#000000'
  });

  calendar.render();
}

// ✅ Turbo対応（ページ遷移後にも確実にカレンダーを表示）
document.addEventListener('turbo:load', loadCalendar);
document.addEventListener('DOMContentLoaded', loadCalendar);
