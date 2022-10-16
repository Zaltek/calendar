import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Day from './Day';

describe('<Day />', () => {
  test('it should mount', () => {
    render(
    <Day 
      date={15} 
      key={15} 
      eventObject={
        {
          name: "eventname",
          description: "event description",
          type: "event type",
          datetime: new Date()
        }
      }
      showEvent={function(){}}
    />
    );
    const day = screen.getByTestId('Day');
    expect(day).toBeInTheDocument();
  });

  test('it should include the date 15', () => {
    render(
    <Day 
      date={15} 
      key={15} 
      eventObject={
        {
          name: "eventname",
          description: "event description",
          type: "event type",
          datetime: new Date()
        }
      }
      showEvent={function(){}}
    />
    );
    const date = screen.getByText('15')
    expect(date).toBeInTheDocument();
  });

  test('it should render event information', () => {
    render(
    <Day 
      date={15} 
      key={15} 
      eventObject={
        {
          name: "eventname",
          description: "event description",
          type: "event type",
          datetime: new Date()
        }
      }
      showEvent={function(){}}
    />
    );
    const view = screen.getByText('View')
    expect(view).toBeInTheDocument();
  });

  test('it should not render event information', () => {
    render(
    <Day 
      date={15} 
      key={15} 
      eventObject={
        {
          name: "",
          description: "",
          type: "",
          datetime: new Date()
        }
      }
      showEvent={function(){}}
    />
    );
    const view = screen.queryByText('View');
    expect(view).not.toBeInTheDocument;
  });
});