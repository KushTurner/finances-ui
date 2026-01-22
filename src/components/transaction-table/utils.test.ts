import { describe, it, expect } from 'vitest';
import { formatDate, formatAmount } from './transaction-table';

describe('formatDate', () => {
  it('formats Date object correctly', () => {
    expect(formatDate(new Date('2023-10-24T00:00:00Z'))).toBe('Oct 24, 2023');
  });

  it('formats date with single digit day', () => {
    expect(formatDate(new Date('2023-10-05T00:00:00Z'))).toBe('Oct 5, 2023');
  });

  it('formats different months correctly', () => {
    expect(formatDate(new Date('2023-01-15T00:00:00Z'))).toBe('Jan 15, 2023');
    expect(formatDate(new Date('2023-12-25T00:00:00Z'))).toBe('Dec 25, 2023');
  });
});

describe('formatAmount', () => {
  it('formats positive amounts with + prefix', () => {
    expect(formatAmount(2500)).toBe('+£2,500.00');
    expect(formatAmount(100)).toBe('+£100.00');
  });

  it('formats negative amounts with - prefix', () => {
    expect(formatAmount(-154.2)).toBe('-£154.20');
    expect(formatAmount(-12.5)).toBe('-£12.50');
  });

  it('formats zero as positive', () => {
    expect(formatAmount(0)).toBe('+£0.00');
  });

  it('formats decimal amounts correctly', () => {
    expect(formatAmount(1234.56)).toBe('+£1,234.56');
    expect(formatAmount(-1234.56)).toBe('-£1,234.56');
  });
});
