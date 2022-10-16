import React, { Suspense, FC, ReactElement, useState } from 'react';
import './App.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const Calendar = React.lazy(() => import('./components/Calendar/Calendar'))

export interface EventObject {
  name: string;
  description: string;
  type: string;
  datetime: Date;
}

const App: FC = (): ReactElement => {
  const [hasEvent, setHasEvent] = useState<boolean>(false);
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

  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    width: '100%'
  };

  return (
    <div className="App Container">
      <Suspense fallback={<div>Loading</div>}>
        <Calendar showEvent={showEvent} key={1}/>
      </Suspense>
      { hasEvent && (
        <Modal
        open={hasEvent}
        onClose={closeEvent}>
          <Box sx={boxStyle}>
            <div className="Open">
              <div className="left">
                <div>Date:</div>
                { eventData.type && (
                <div>Type:</div> )}
                { eventData.name && (
                <div>Name:</div>)}
                { eventData.description && (
                <div>Description:</div>)}
              </div>
              <div className="left">
                <div>{eventData.datetime.toDateString()}</div>
                { eventData.type && (
                <div>{eventData.type}</div>)}
                { eventData.name && (
                <div>{eventData.name}</div>)}
                { eventData.description && (
                <div>{eventData.description}</div> )}
              </div>
            </div>
            <Button sx ={buttonStyle} onClick={closeEvent}>Close Event</Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default App;
