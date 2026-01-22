import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/api';
import type { TransactionTableProps } from './types';

const fuzzyFilter: FilterFn<Transaction> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const CATEGORY_COLORS: Record<string, string> = {
  GROCERIES: 'bg-green-500/20 text-green-400',
  INCOME: 'bg-green-500/20 text-green-400',
  DINING: 'bg-orange-500/20 text-orange-400',
  ENTERTAINMENT: 'bg-yellow-500/20 text-yellow-400',
  HOUSING: 'bg-blue-500/20 text-blue-400',
  TRANSPORT: 'bg-red-500/20 text-red-400',
  UTILITIES: 'bg-blue-500/20 text-blue-400',
  TECH: 'bg-purple-500/20 text-purple-400'
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatAmount(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
  }).format(Math.abs(amount) / 100);

  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
}

function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return null;

  const colorClass =
    CATEGORY_COLORS[category.toUpperCase()] ?? 'bg-gray-500/20 text-gray-400';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase',
        colorClass
      )}
    >
      {category}
    </span>
  );
}

function SortableHeader({
  children,
  onClick,
  sortDirection
}: {
  children: React.ReactNode;
  onClick: () => void;
  sortDirection: 'asc' | 'desc' | false;
}) {
  const isSorted = sortDirection !== false;

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer',
        isSorted && 'text-foreground'
      )}
    >
      {children}
      {sortDirection === 'asc' ? (
        <ArrowUp className="h-3 w-3" />
      ) : sortDirection === 'desc' ? (
        <ArrowDown className="h-3 w-3" />
      ) : (
        <ArrowUpDown className="h-3 w-3" />
      )}
    </button>
  );
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(undefined, true)}
        sortDirection={column.getIsSorted()}
      >
        DATE
      </SortableHeader>
    ),
    cell: ({ row }) => formatDate(row.getValue('date'))
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(undefined, true)}
        sortDirection={column.getIsSorted()}
      >
        DESCRIPTION
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('description')}</span>
    )
  },
  {
    accessorKey: 'bank',
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(undefined, true)}
        sortDirection={column.getIsSorted()}
      >
        BANK
      </SortableHeader>
    )
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(undefined, true)}
        sortDirection={column.getIsSorted()}
      >
        CATEGORY
      </SortableHeader>
    ),
    cell: ({ row }) => <CategoryBadge category={row.getValue('category')} />
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader
          onClick={() => column.toggleSorting(undefined, true)}
          sortDirection={column.getIsSorted()}
        >
          AMOUNT
        </SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      const currency = row.original.currency;
      return (
        <span
          className={cn(
            'text-right block font-medium',
            amount < 0 ? 'text-red-500' : 'text-green-500'
          )}
        >
          {formatAmount(amount, currency)}
        </span>
      );
    }
  }
];

function TableSkeleton() {
  return (
    <div
      className="flex-1 animate-pulse"
      style={{
        background: `repeating-linear-gradient(
          to bottom,
          hsl(var(--muted)) 0px,
          hsl(var(--muted)) 48px,
          transparent 48px,
          transparent 49px
        )`
      }}
    />
  );
}

export function TransactionTable({
  transactions,
  globalFilter,
  onGlobalFilterChange,
  pageSize = 10,
  isLoading = false
}: TransactionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: transactions,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: onGlobalFilterChange,
    enableMultiSort: false,
    state: {
      sorting,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize
      }
    }
  });

  const { pageIndex } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  const pageCount = table.getPageCount();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col flex-1">
        <div className="rounded-md border flex-1 overflow-auto flex flex-col">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="rounded-md border flex-1 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-muted-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          Showing {startRow} to {endRow} of {totalRows} transactions
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={cn(
                'h-8 w-8 rounded-md text-sm font-medium',
                pageIndex === i
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
