import type { Transaction } from '@/api';

export interface TransactionTableProps {
  transactions: Transaction[];
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  pageSize?: number;
  isLoading?: boolean;
}
