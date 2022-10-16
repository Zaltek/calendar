import { FC, ReactElement, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import Card from '@mui/material/Card';

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
      <Calendar showEvent={showEvent} key={1}/>
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
