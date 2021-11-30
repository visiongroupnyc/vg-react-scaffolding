import { render, screen } from '@testing-library/react';
import App from './App';

test('renders reely app', () => {
  render(<App />);
  const linkElement = screen.getByText(/reely/i);
  expect(linkElement).toBeInTheDocument();
});
