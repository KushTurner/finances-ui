export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  bank: string;
  category: string | null;
}
