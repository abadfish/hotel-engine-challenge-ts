import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title of application', () => {
  render(<App />);
  const linkElement = screen.getByText(/Github/i);
  expect(linkElement).toBeInTheDocument();
});
