import React, { FC, useState } from 'react';
import Day from '../Day/Day';
import './Calendar.css';

export interface CalendarProps {
  event?: object;
}

const GetDateObjects = () => {
  const [monthObj, setMonthObj] = useState([]);
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
    // If loop is within the month, push the object to an array
    monthArray.push(todayDatetime);
  }
  //setMonthObj(monthArray)
  return monthArray;

}

const Calendar: FC<CalendarProps> = (props) => (
  <div className="Calendar" data-testid="Calendar">
    {GetDateObjects().map((datetime, index) => 
      <Day date={datetime.getDate()} />
    )}
  </div>
);

export default Calendar;
