export interface Transaction {
  id: string;
  date: Date;
  description: string;
  account: string;
  category: string | null;
  amount: number;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  pageSize?: number;
}
