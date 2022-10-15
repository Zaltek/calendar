import React, { FC, ReactElement, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar/Calendar';

export interface EventObject {
  name: string;
  description: string;
  type: string;
}

const App: FC = (): ReactElement => {
  const [hasEvent, setHasEvent] = useState<Boolean>(false);
  const [eventData, setEventData] = useState<EventObject>({
    name: "",
    description: "",
    type: ""
  });

  const showEvent = (eventObject: EventObject):void => {
    setEventData(eventObject);
    setHasEvent(true);
  }

  const closeEvent = () => {
    setHasEvent(false);
  }

  return (
    <div className="App">
      <Calendar showEvent={showEvent} />
      { hasEvent && (
        <div className="Event Day">
          <div className="Close" onClick={(e) => closeEvent()}>X</div>
          <div>{eventData.type}</div>
          <div>{eventData.name}</div>
          <div>{eventData.description}</div>
        </div>
      )}
    </div>
  );
}

export default App;
