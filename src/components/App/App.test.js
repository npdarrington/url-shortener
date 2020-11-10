import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  test('should render App to the page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'URL Shortener'})).toBeInTheDocument();
  })
  
})
