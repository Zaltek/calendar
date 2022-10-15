import { render } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { isConstructorDeclaration } from 'typescript';
import './Day.css';

export interface DayProps {
  date: number;
  eventObject: EventObject;
}

export interface EventObject {
  name: string;
  description: string;
  type: string;
}

const Day: FC<DayProps> = (props): ReactElement => {
  const openEventModal = (eventObject: EventObject, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert(JSON.stringify(eventObject))
  }

  return  (
    <div className={props.eventObject?.name? 'Event Day':'Day'} data-testid="Day">
      <div className="day-date">{props.date}</div>
      {props.eventObject && props.eventObject.name && (
        <a href="#" onClick={(e) => openEventModal(props.eventObject, e)}>View Event</a>
      )}
    </div>
  )
}

export default Day;