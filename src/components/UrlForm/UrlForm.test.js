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
})
