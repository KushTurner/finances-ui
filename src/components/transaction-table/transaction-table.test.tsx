import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TransactionTable } from './transaction-table';
import type { Transaction } from '@/api';

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: new Date('2023-10-24T00:00:00Z'),
    description: 'Grocer Store Checkout',
    bank: 'American Express',
    category: 'GROCERIES',
    amount: -15420,
    currency: 'GBP'
  },
  {
    id: 2,
    date: new Date('2023-10-22T00:00:00Z'),
    description: 'Monthly Salary',
    bank: 'Nationwide',
    category: 'INCOME',
    amount: 250000,
    currency: 'GBP'
  },
  {
    id: 3,
    date: new Date('2023-10-20T00:00:00Z'),
    description: 'City Coffee House',
    bank: 'American Express',
    category: 'DINING',
    amount: -1250,
    currency: 'GBP'
  },
  {
    id: 4,
    date: new Date('2023-10-18T00:00:00Z'),
    description: 'No Category Transaction',
    bank: 'Nationwide',
    category: null,
    amount: -5000,
    currency: 'GBP'
  }
];

describe('TransactionTable', () => {
  it('renders transaction data correctly', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    expect(screen.getByText('Grocer Store Checkout')).toBeInTheDocument();
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    expect(screen.getAllByText('American Express')).toHaveLength(2);
    expect(screen.getAllByText('Nationwide')).toHaveLength(2);
  });

  it('displays positive amounts in green', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    const positiveAmount = screen.getByText('+£2,500.00');
    expect(positiveAmount).toHaveClass('text-income');
  });

  it('displays negative amounts in red', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    const negativeAmount = screen.getByText('-£154.20');
    expect(negativeAmount).toHaveClass('text-expense');
  });

  it('renders category badges with correct colors', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    const groceriesBadge = screen.getByText('GROCERIES');
    expect(groceriesBadge).toHaveClass('bg-green-500/20', 'text-green-400');

    const diningBadge = screen.getByText('DINING');
    expect(diningBadge).toHaveClass('bg-orange-500/20', 'text-orange-400');
  });

  it('handles null category gracefully', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    expect(screen.getByText('No Category Transaction')).toBeInTheDocument();
    const categoryBadges = screen.getAllByText(/GROCERIES|INCOME|DINING/);
    expect(categoryBadges).toHaveLength(3);
  });

  it('displays empty state when no transactions', () => {
    render(<TransactionTable transactions={[]} />);

    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
  });

  it('shows pagination info correctly', () => {
    render(<TransactionTable transactions={mockTransactions} pageSize={2} />);

    expect(
      screen.getByText('Showing 1 to 2 of 4 transactions')
    ).toBeInTheDocument();
  });

  it('sorts by date when date header is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={mockTransactions} />);

    const dateHeader = screen.getByRole('button', { name: /date/i });
    await user.click(dateHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Oct 24, 2023');
  });

  it('sorts by amount when amount header is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={mockTransactions} />);

    const amountHeader = screen.getByRole('button', { name: /amount/i });
    await user.click(amountHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('+£2,500.00');
  });

  it('navigates to next page when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={mockTransactions} pageSize={2} />);

    expect(
      screen.getByText('Showing 1 to 2 of 4 transactions')
    ).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next page/i });
    await user.click(nextButton);

    expect(
      screen.getByText('Showing 3 to 4 of 4 transactions')
    ).toBeInTheDocument();
  });

  it('navigates to specific page when page number is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={mockTransactions} pageSize={2} />);

    const page2Button = screen.getByRole('button', { name: '2' });
    await user.click(page2Button);

    expect(
      screen.getByText('Showing 3 to 4 of 4 transactions')
    ).toBeInTheDocument();
  });

  it('respects custom pageSize prop', () => {
    render(<TransactionTable transactions={mockTransactions} pageSize={3} />);

    expect(
      screen.getByText('Showing 1 to 3 of 4 transactions')
    ).toBeInTheDocument();
  });

  it('formats dates correctly', () => {
    render(<TransactionTable transactions={mockTransactions} />);

    expect(screen.getByText('Oct 24, 2023')).toBeInTheDocument();
    expect(screen.getByText('Oct 22, 2023')).toBeInTheDocument();
  });
});
