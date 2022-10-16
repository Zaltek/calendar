import React, { Suspense, FC, ReactElement, useEffect, useState } from 'react';
import './Calendar.css';
const Day = React.lazy(() => import('../Day/Day'))

export interface CalendarProps {
  event?: EventObject;
  calendarEvents?: Array<EventObject>;
  showEvent: (eventObject: EventObject) => void;
  key: number;
}

// Event raw data
export interface EventsData {
  name: string;
  date: string;
  description: string;
  type: string;
}

// Event after parsing
export interface EventObject {
  name: string;
  datetime: Date;
  description: string;
  type: string;
}

// Sample event data
const RawData = [
  {
    "name": "Event 1",
    "date": "10/11/2022",
    "description": "You are invited to my party",
    "type": "Birthday"
  },
  {
    "name": "Event 2",
    "date": "10/20/2022",
    "description": "Bob's Retirement",
    "type": "Work"
  }
];

const Calendar: FC<CalendarProps> = (props): ReactElement => {
  const [calendarEvents, setCalendarEvents] = useState<Array<EventsData>>(RawData),
  [needEvents, setNeedEvents] = useState<Boolean>(false),
  [month, setMonth] = useState<String>(''),
  [monthContainer, setMonthContainer] = useState<Array<EventObject>>([{
        datetime: new Date(),
        name: '',
        description: '',
        type: ''
  }]),
  today = new Date();

  const getMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    setMonth(months[today.getMonth()])
  }

  const SetupDateObjects = () => {
    /* new Date(year, monthIndex, day)
    Sets up the calendar dates for the month.
    
    Loop through up to 31 times. */
    const monthArray = [];
    let todayDatetime;

    for (let day=1; day<32; day++) {
      todayDatetime = new Date(today.getFullYear(), today.getMonth(), day);
      // If loop is past this month, we're done
      if (todayDatetime.getMonth() !== today.getMonth()) {
        break;
      }
      let eventDate,
      dayObject = {
        datetime: todayDatetime,
        name: '',
        description: '',
        type: ''
      };

      // Loop through all events
      for (let index=0; index<calendarEvents.length; index++) {
        eventDate = calendarEvents[index].date;
        // Check if event is today, if so add it
        if (new Date(eventDate).getDate() === day) {
          dayObject = {...calendarEvents[index], datetime: todayDatetime}
        }
      }
      // If loop is within the month, push the object to an array
      monthArray.push(dayObject);
    }
    setMonthContainer(monthArray);
  }

  useEffect(() => {
    // Prevent duplicate calls
    if (!needEvents) {
      setNeedEvents(true);
    }
  }, [needEvents])


  useEffect(() => {
    if (!calendarEvents.length || needEvents) {
      return
    }
    getMonth();
    setCalendarEvents(calendarEvents);
    SetupDateObjects();
  }, [needEvents])

  return (
  <div className="Calendar" data-testid="Calendar">
    <div className="Month">{month}</div>
    <div className="Days">
      <Suspense fallback={<div>Loading</div>}>
      { monthContainer.length &&
        monthContainer.map((dayObject, index) => 
            <Day date={dayObject.datetime.getDate()} 
              key={index} 
              eventObject={dayObject}
              showEvent={props.showEvent}
            />
        )
      }
      </Suspense>
    </div>
  </div>)
}

export default Calendar;
