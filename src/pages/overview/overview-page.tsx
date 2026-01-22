import { TransactionTable } from '@/components/transaction-table/transaction-table';
import type { Transaction } from '@/components/transaction-table/types';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-01-15T00:00:00Z'),
    description: 'Tesco Groceries',
    account: 'Current Account',
    category: 'Groceries',
    amount: -85.43
  },
  {
    id: '2',
    date: new Date('2024-01-14T00:00:00Z'),
    description: 'Monthly Salary',
    account: 'Current Account',
    category: 'Income',
    amount: 3500.0
  },
  {
    id: '3',
    date: new Date('2024-01-13T00:00:00Z'),
    description: 'Netflix Subscription',
    account: 'Credit Card',
    category: 'Entertainment',
    amount: -15.99
  },
  {
    id: '4',
    date: new Date('2024-01-12T00:00:00Z'),
    description: 'Uber Ride',
    account: 'Current Account',
    category: 'Transport',
    amount: -24.5
  },
  {
    id: '5',
    date: new Date('2024-01-11T00:00:00Z'),
    description: 'Nandos',
    account: 'Credit Card',
    category: 'Dining',
    amount: -32.0
  }
];

export function OverviewPage() {
  return (
    <div className="p-6 flex flex-col flex-1">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <TransactionTable transactions={SAMPLE_TRANSACTIONS} />
    </div>
  );
}
