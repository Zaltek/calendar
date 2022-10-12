import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Day from './Day';

describe('<Day />', () => {
  test('it should mount', () => {
    render(<Day date={5} />);
    
    const day = screen.getByTestId('Day');

    expect(day).toBeInTheDocument();
  });
});