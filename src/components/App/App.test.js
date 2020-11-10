import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getUrls, postUrl } from '../../apiCalls'

import App from './App';

jest.mock('../../apiCalls.js')

const mockUrlData = { urls: [
  {
    id: 1,
    long_url: 'https://unsplash.com/photos/1p7TrM0LkXc',
    short_url: 'http://localhost:3001/useshorturl/1',
    title: 'Testing 1'
  },
  {
    id: 2,
    long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    short_url: 'http://localhost:3001/useshorturl/2',
    title: 'Testing 2'
  }
]
}

describe('App', () => {
  test('should render App heading to the page', () => {
    getUrls.mockResolvedValue(mockUrlData);
    render(<App />);
    expect(screen.getByRole('heading', { name: 'URL Shortener'})).toBeInTheDocument();
  })
  
})
