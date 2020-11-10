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
  
})
