import React, { FC, ReactElement } from 'react';
import './Day.css';

export interface DayProps {
  date: number;
  event?: EventObject;
}

export interface EventObject {
  name: string;
  date: string;
  dateObject?: Date;
  description: string;
  type: string;
}

const Day: FC<DayProps> = (props): ReactElement => {
  let eventObject;
  if (props.event) {
    eventObject = <div className="event-name">{props.event.name}</div>
  }
  return  (
    <div className="Day" data-testid="Day">
    <div className="day-date">{props.date}</div>
    {eventObject}
  </div>
  )
}

export default Day;
