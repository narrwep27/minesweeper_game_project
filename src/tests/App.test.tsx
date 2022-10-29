import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import GameBoard from '../components/GameBoard';

test('renders GameBoard component in App.tsx', () => {
  render(<App />);
});
