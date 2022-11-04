import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('App.tsx test cases', () => {
  test('renders GameBoard component in App.tsx', () => {
    render(<App />);
    expect(screen.getByTestId('GameBoard')).toBeInTheDocument();
  })
  
  test('renders GameHeader component in App.tsx', () => {
    render(<App />);
    expect(screen.getByTestId('GameHeader')).toBeInTheDocument();
  });
});
