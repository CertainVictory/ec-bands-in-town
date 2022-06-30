import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders search', () => {
  render(<App />);
  const searchDefaultText = screen.getByText(/Search for you favorite Artist/i);
  expect(searchDefaultText).toBeInTheDocument();
});
