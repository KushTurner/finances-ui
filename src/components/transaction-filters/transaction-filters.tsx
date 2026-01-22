import { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

interface TransactionFiltersProps {
  selectedMonth: number;
  selectedYear: number;
  searchQuery: string;
  onDateChange: (month: number, year: number) => void;
  onSearchChange: (query: string) => void;
  onAddTransaction: () => void;
}

function MonthYearPicker({
  selectedMonth,
  selectedYear,
  onSelect
}: {
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}) {
  const [viewYear, setViewYear] = useState(selectedYear);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewYear(viewYear - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{viewYear}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewYear(viewYear + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, index) => (
          <Button
            key={month}
            variant="ghost"
            size="sm"
            className={cn(
              'text-xs',
              selectedMonth === index &&
                selectedYear === viewYear &&
                'bg-primary text-primary-foreground hover:bg-primary/80'
            )}
            onClick={() => onSelect(index, viewYear)}
          >
            {month.slice(0, 3)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function TransactionFilters({
  selectedMonth,
  selectedYear,
  searchQuery,
  onDateChange,
  onSearchChange,
  onAddTransaction
}: TransactionFiltersProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleMonthSelect = (month: number, year: number) => {
    onDateChange(month, year);
    setDatePickerOpen(false);
  };

  const now = new Date();
  const isCurrentMonth =
    selectedMonth === now.getMonth() && selectedYear === now.getFullYear();
  const formattedDate = isCurrentMonth
    ? 'Current Month'
    : `${MONTHS[selectedMonth]} ${selectedYear}`;

  return (
    <div className="flex items-center gap-3 mb-4">
      <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg" className="gap-2">
            <Calendar className="size-4 text-primary" />
            <span className="leading-none">{formattedDate}</span>
            <ChevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <MonthYearPicker
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onSelect={handleMonthSelect}
          />
        </PopoverContent>
      </Popover>

      <div className="flex-1" />

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-8 w-64"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Button
        onClick={onAddTransaction}
        size="lg"
        className="gap-2 text-white font-bold"
      >
        <Plus className="size-4" />
        <span className="leading-none">Add Transaction</span>
      </Button>
    </div>
  );
}
