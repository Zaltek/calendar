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
    "date": "10/15/2022",
    "description": "You are invited to my party",
    "type": "Birthday"
  },
  {
    "name": "Event 2",
    "date": "10/19/2022",
    "description": "Bob's Retirement",
    "type": "Work"
  }
];

const Calendar: FC<CalendarProps> = (props): ReactElement => {
  const [calendarEvents, setCalendarEvents] = useState<Array<EventsData>>(RawData);
  const [needEvents, setNeedEvents] = useState<Boolean>(false);
  const [monthContainer, setMonthContainer] = useState<Array<EventObject>>([{
        datetime: new Date(),
        name: '',
        description: '',
        type: ''
  }])

  const SetupDateObjects = () => {
    /* new Date(year, monthIndex, day)
    Sets up the calendar dates for the month.
    
    Loop through up to 31 times. */
    const monthArray = [];
    let today = new Date(),
    todayDatetime;

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
    setCalendarEvents(calendarEvents);
    SetupDateObjects();
  }, [needEvents])

  return (
  <div className="Calendar" data-testid="Calendar">
    { monthContainer.length &&
      monthContainer.map((dayObject, index) => 
        <Suspense fallback={<div>Loading</div>}>
          <Day date={dayObject.datetime.getDate()} 
            key={index} 
            eventObject={dayObject}
            showEvent={props.showEvent}
          />
        </Suspense>
      )
    }
  </div>)
}

export default Calendar;
