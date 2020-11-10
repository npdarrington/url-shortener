import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import UrlContainer from './UrlContainer';

describe('UrlContainer', () => {
  test('should render all Urls to the page', () => {
    const mockUrls = [
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
    const mockDeleteUrl = jest.fn();
    render(<UrlContainer urls={mockUrls} deleteUrl={mockDeleteUrl} />)
    expect(screen.getByText('Testing 1')).toBeInTheDocument();
    expect(screen.getByText('https://unsplash.com/photos/1p7TrM0LkXc')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/1')).toBeInTheDocument();
    expect(screen.getByText('Testing 2')).toBeInTheDocument();
    expect(screen.getByText('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/2')).toBeInTheDocument();
  })

  test('should render a conditional message if no urls are found', () => {
    const mockDeleteUrl = jest.fn();
    render(<UrlContainer urls={[]} deleteUrl={mockDeleteUrl} />);
    expect(screen.getByText('No urls yet! Find some to shorten!')).toBeInTheDocument();
  })

  test('should delete a url when delete button is clicked', () => {
    const mockUrls = [
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
    const mockDeleteUrl = jest.fn();
    render(<UrlContainer urls={mockUrls} deleteUrl={mockDeleteUrl} />)
    const getAllDeleteBtn = screen.getAllByRole('button', { name: 'Delete'});
    userEvent.click(getAllDeleteBtn[1]);
    expect(mockDeleteUrl).toHaveBeenCalledTimes(1);
    expect(mockDeleteUrl).toHaveBeenCalledWith(2);
  })
})
