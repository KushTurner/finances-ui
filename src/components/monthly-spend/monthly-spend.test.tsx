import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MonthlySpend } from './monthly-spend';

describe('MonthlySpend', () => {
  it('renders the amount', () => {
    render(<MonthlySpend amount="$3,420.50" />);

    expect(screen.getByText('$3,420.50')).toBeInTheDocument();
    expect(screen.getByText('TOTAL SPEND THIS MONTH')).toBeInTheDocument();
  });

  it('renders positive percentage change', () => {
    render(<MonthlySpend amount="$3,420.50" percentageChange={12} />);

    expect(screen.getByText('12% Increase')).toBeInTheDocument();
  });

  it('renders negative percentage change', () => {
    render(<MonthlySpend amount="$2,100.00" percentageChange={-8} />);

    expect(screen.getByText('8% Decrease')).toBeInTheDocument();
  });

  it('hides percentage when zero', () => {
    render(<MonthlySpend amount="$3,420.50" percentageChange={0} />);

    expect(screen.queryByText('Increase')).not.toBeInTheDocument();
    expect(screen.queryByText('Decrease')).not.toBeInTheDocument();
  });

  it('hides percentage when undefined', () => {
    render(<MonthlySpend amount="$3,420.50" />);

    expect(screen.queryByText('Increase')).not.toBeInTheDocument();
    expect(screen.queryByText('Decrease')).not.toBeInTheDocument();
  });

  it('renders skeleton when loading', () => {
    render(<MonthlySpend amount="$3,420.50" isLoading />);

    expect(screen.queryByText('$3,420.50')).not.toBeInTheDocument();
    expect(
      screen.queryByText('TOTAL SPEND THIS MONTH')
    ).not.toBeInTheDocument();
  });
});
