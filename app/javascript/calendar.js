import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');
  if (calendarEl) {
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
});
