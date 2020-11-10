import React from 'react'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import UrlForm from './UrlForm';

describe('UrlForm', () => {
  beforeEach(() => {
    const mockSubmitUrl = jest.fn();
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
  
})
