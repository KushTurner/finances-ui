import { TrendingUp, TrendingDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SpendHeroProps {
  totalSpend: number;
  currency: string;
  percentageChange?: number;
  isLoading?: boolean;
}

const BAR_HEIGHTS = ['20%', '40%', '35%', '60%', '55%', '80%', '100%'];

export function SpendHero({
  totalSpend,
  currency,
  percentageChange,
  isLoading = false
}: SpendHeroProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 mb-8">
        <Skeleton className="h-3 w-40 mb-3" />
        <Skeleton className="h-14 w-56 mb-3" />
        <Skeleton className="h-5 w-36" />
      </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
  }).format(totalSpend / 100);

  const isMore = percentageChange !== undefined && percentageChange > 0;
  const isLess = percentageChange !== undefined && percentageChange < 0;
  const showTrend = percentageChange !== undefined && percentageChange !== 0;

  return (
    <div className="bg-card rounded-2xl border border-border p-8 mb-8 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Total Spend This Month
        </p>
        <p className="text-6xl font-extrabold text-foreground tracking-tight">{formattedAmount}</p>
        {showTrend && (
          <div
            className={cn(
              'flex items-center gap-2 text-sm font-semibold',
              isMore && 'text-expense',
              isLess && 'text-income'
            )}
          >
            {isMore ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            <span>
              {Math.abs(percentageChange!)}% {isMore ? 'more' : 'less'} than last month
            </span>
          </div>
        )}
      </div>
      <div className="w-full md:w-72 h-32 rounded-xl bg-muted/50 border border-border flex items-end gap-1.5 p-5">
        {BAR_HEIGHTS.map((height, i) => (
          <div
            key={i}
            className={cn(
              'w-full rounded-sm',
              i === BAR_HEIGHTS.length - 1 ? 'bg-primary' : 'bg-primary/20'
            )}
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
}
