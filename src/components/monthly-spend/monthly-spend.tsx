import { TrendingUp, TrendingDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MonthlySpendProps {
  amount: string;
  percentageChange?: number;
  isLoading?: boolean;
}

export function MonthlySpend({
  amount,
  percentageChange,
  isLoading = false
}: MonthlySpendProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <Skeleton className="h-3 w-32 mb-3" />
        <Skeleton className="h-8 w-28 mb-2" />
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  const isPositive = percentageChange !== undefined && percentageChange > 0;
  const isNegative = percentageChange !== undefined && percentageChange < 0;
  const showPercentage =
    percentageChange !== undefined && percentageChange !== 0;

  return (
    <div className="px-4 py-6">
      <p className="text-xs font-medium text-muted-foreground tracking-wide mb-1">
        TOTAL SPEND THIS MONTH
      </p>
      <p className="text-2xl font-bold">{amount}</p>
      {showPercentage && (
        <div
          className={cn(
            'flex items-center gap-1 mt-1 text-sm',
            isPositive && 'text-emerald-500',
            isNegative && 'text-red-500'
          )}
        >
          {isPositive ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
          <span>
            {Math.abs(percentageChange)}% {isPositive ? 'Increase' : 'Decrease'}
          </span>
        </div>
      )}
    </div>
  );
}
