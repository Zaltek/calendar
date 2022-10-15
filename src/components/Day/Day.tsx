import { render } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { isConstructorDeclaration } from 'typescript';
import './Day.css';
import Card from '@mui/material/Card';

export interface DayProps {
  date: number;
  eventObject: EventObject;
}

export interface EventObject {
  name: string;
  description: string;
  type: string;
}

/*
• Selecting a day with a scheduled event needs to show event details somewhere outside of
the calendar component
• Write a good README.md
• Include tests. You do not have to test your full application, but select an area where you
feel testing is important, and write quality tests using the framework of your choice
*/

const Day: FC<DayProps> = (props): ReactElement => {
  const openEventModal = (eventObject: EventObject, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert(JSON.stringify(eventObject))
  }

  let dayClasses;
  const event = props.eventObject?.name? "Event":"";
  const today = new Date().getDate() === props.date? "Today":"";

  return  (
    <Card >
      <div className={`Day ${event} ${today}`} data-testid="Day">
        <div className="Date">{props.date}</div>
        {props.eventObject && props.eventObject.name && (
          <a href="#" onClick={(e) => openEventModal(props.eventObject, e)}>View Event</a>
        )}
      </div>
    </Card>
  )
}

export default Day;