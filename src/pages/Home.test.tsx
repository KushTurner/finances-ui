import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  it('Says Hello World', () => {
    render(<Home />);
    const header = screen.getByText('Hello World');

    expect(header).toBeInTheDocument();
  });
});
