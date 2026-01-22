import { apiClient } from './client';
import type { Transaction } from './types';

export async function getTransactions(): Promise<Transaction[]> {
  const response = await apiClient.get<Transaction[]>('/transactions');
  return response.data.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date as unknown as string)
  }));
}
