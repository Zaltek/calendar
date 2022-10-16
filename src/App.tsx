import React, { Suspense, FC, ReactElement, useState } from 'react';
import './App.css';
import Card from '@mui/material/Card';
const Calendar = React.lazy(() => import('./components/Calendar/Calendar'))

export interface EventObject {
  name: string;
  description: string;
  type: string;
  datetime: Date;
}

const App: FC = (): ReactElement => {
  const [hasEvent, setHasEvent] = useState<Boolean>(false);
  const [eventData, setEventData] = useState<EventObject>({
    name: "",
    description: "",
    type: "",
    datetime: new Date()
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
      <Suspense fallback={<div>Loading</div>}>
        <Calendar showEvent={showEvent} key={1}/>
      </Suspense>
      { hasEvent && (
        <Card>
          <div className="Event Open">
            <a className="Close" href="#" onClick={(e) => closeEvent()}>X</a>
            <div>{eventData.datetime.toDateString()}</div>
            <div>{eventData.type}</div>
            <div>{eventData.name}</div>
            <div>{eventData.description}</div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
