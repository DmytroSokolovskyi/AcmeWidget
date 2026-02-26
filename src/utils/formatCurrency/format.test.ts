import {describe, expect, it} from 'vitest';
import {formatCurrency} from './formatCurrency';

describe('formatCurrency', () => {
    it('should format cents to USD currency string', () => {
        expect(formatCurrency(3295)).toBe('$32.95');
        expect(formatCurrency(795)).toBe('$7.95');
        expect(formatCurrency(0)).toBe('$0.00');
        expect(formatCurrency(5)).toBe('$0.05');
        expect(formatCurrency(1200)).toBe('$12.00');
    });
});
