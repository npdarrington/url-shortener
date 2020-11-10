import React from 'react'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import UrlForm from './UrlForm';

const mockSubmitUrl = jest.fn();

describe('UrlForm', () => {
  beforeEach(() => {
    render(<UrlForm submitUrl={mockSubmitUrl} />)
  })
  
  test('should render UrlForm to the dom', () => {
    expect(screen.getByPlaceholderText('Title...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL to Shorten...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shorten Please!'})).toBeInTheDocument();
  })

  test('should let user type into the input boxes', () => {
    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    userEvent.type(titleInput, 'Testing 1');
    userEvent.type(urlInput, 'https://unsplash.com/photos/1p7TrM0LkXc');
    expect(titleInput.value).toBe('Testing 1');
    expect(urlInput.value).toBe('https://unsplash.com/photos/1p7TrM0LkXc');
  })
  
  test('should fire the submitUrl function when submit button is clicked', () => {
    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    userEvent.type(titleInput, 'Testing 1');
    userEvent.type(urlInput, 'https://unsplash.com/photos/1p7TrM0LkXc');
    userEvent.click(screen.getByRole('button', { name: 'Shorten Please!'}));
    expect(mockSubmitUrl).toHaveBeenCalledTimes(1);
    expect(mockSubmitUrl).toHaveBeenCalledWith({
      title: 'Testing 1',
      urlToShorten: 'https://unsplash.com/photos/1p7TrM0LkXc'
    })
  })
  
})
