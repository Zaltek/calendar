import React, { FC } from 'react';
import './Day.css';

export interface DayProps {
  date: number;
}

const Day: FC<DayProps> = (props) => (
  <div className="Day" data-testid="Day">
    <div className="day-date">{props.date}</div>
  </div>
);

export default Day;
