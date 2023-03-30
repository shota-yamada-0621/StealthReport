import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import jaLocale from '@fullcalendar/core/locales/ja';
import './static/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Calendar() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const events = data.map(item => ({
    title: '日報作成済',
    start: item.select_date,
    end: item.select_date,
    display: 'background',
    backgroundColor: "#33FFFF",
    borderColor: '#99FFFF',
    allDay: true,
    eventtextColor: '#003399',
  }));

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        events={events}
      />
    </div>
  );
}

export default Calendar;
