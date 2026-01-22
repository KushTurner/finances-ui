import { useMemo, useState } from 'react';
import { TransactionFilters } from '@/components/transaction-filters';
import { TransactionTable } from '@/components/transaction-table';
import { useTransactions } from '@/hooks/use-transactions';

export function OverviewPage() {
  const { data: transactions, isLoading } = useTransactions();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [searchQuery, setSearchQuery] = useState('');

  const dateFilteredTransactions = useMemo(() => {
    return (transactions ?? []).filter((transaction) => {
      return (
        transaction.date.getMonth() === selectedMonth &&
        transaction.date.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  const handleDateChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddTransaction = () => {
    // Placeholder - logic to be added later
  };

  return (
    <div className="p-6 flex flex-col flex-1">
      <TransactionFilters
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        searchQuery={searchQuery}
        onDateChange={handleDateChange}
        onSearchChange={handleSearchChange}
        onAddTransaction={handleAddTransaction}
      />
      <TransactionTable
        transactions={dateFilteredTransactions}
        globalFilter={searchQuery}
        onGlobalFilterChange={setSearchQuery}
        isLoading={isLoading}
      />
    </div>
  );
}
