import { FC, ReactElement } from 'react';
import './Day.css';
import Card from '@mui/material/Card';

export interface DayProps {
  date: number;
  eventObject: EventObject;
  showEvent: (eventObject: EventObject) => void;
}

export interface EventObject {
  name: string;
  description: string;
  type: string;
  datetime: Date;
}

const Day: FC<DayProps> = (props): ReactElement => {
  const event = props.eventObject?.name? "Event":"";
  const today = new Date().getDate() === props.date? "Today":"";

  return  (
    <Card >
      <div className={`Day ${event} ${today}`} data-testid="Day">
        <div className="Date">{props.date}</div>
        {props.eventObject.name && (
          <a href="#" onClick={(e) => props.showEvent(props.eventObject)}>View</a>
        )}
      </div>
    </Card>
  )
}

export default Day;