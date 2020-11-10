import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
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
  
  test('should render any urls found in fetch call to DOM', async () => {
    getUrls.mockResolvedValue(mockUrlData);
    render(<App />);
    await waitFor(() => screen.getByRole('heading', { name: 'URL Shortener'}))
    expect(screen.getByText('Testing 1')).toBeInTheDocument();
    expect(screen.getByText('https://unsplash.com/photos/1p7TrM0LkXc')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/1')).toBeInTheDocument();
    expect(screen.getByText('Testing 2')).toBeInTheDocument();
    expect(screen.getByText('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/2')).toBeInTheDocument();
  })
  
  test('should allow a user to post a new url to shorten and display on the page', async () => {
    getUrls.mockResolvedValue(mockUrlData);
    postUrl.mockResolvedValue({
      id: 3,
      title: 'Testing 3',
      long_url: 'https://unsplash.com/photos/1p7TrM0L',
      short_url: 'http://localhost:3001/useshorturl/3'
    })
    render(<App />);
    await waitFor(() => screen.getByRole('heading', { name: 'URL Shortener'}))
    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    userEvent.type(titleInput, 'Testing 3');
    userEvent.type(urlInput, 'https://unsplash.com/photos/1p7TrM0L');
    userEvent.click(screen.getByRole('button', { name: 'Shorten Please!'}));
    const newUrlTitle = await waitFor(() => screen.getByText('Testing 3'));
    expect(newUrlTitle).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/3')).toBeInTheDocument();
    expect(screen.getByText('https://unsplash.com/photos/1p7TrM0L')).toBeInTheDocument();
  })
})
