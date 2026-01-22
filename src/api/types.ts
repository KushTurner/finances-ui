export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  bank: string;
  category: string | null;
}
