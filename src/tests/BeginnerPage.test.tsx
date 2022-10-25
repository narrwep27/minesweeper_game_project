import React from 'react';
import { render, screen } from '@testing-library/react';
import BeginnerPage from '../pages/BeginnerPage';

test('renders learn react link', () => {
  render(<BeginnerPage />);
});
