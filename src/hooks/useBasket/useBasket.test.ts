import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useBasket } from './useBasket';

describe('useBasket hook', () => {
    it('should initialize with an empty state', () => {
        const { result } = renderHook(() => useBasket());

        expect(result.current.addedProductCodes).toHaveLength(0);
        expect(result.current.breakdown.totalCents).toBe(0);
    });

    it('should handle multiple products', () => {
        const { result } = renderHook(() => useBasket());

        act(() => {
            result.current.addProduct('B01');
            result.current.addProduct('B01');
        });

        expect(result.current.addedProductCodes).toEqual(['B01', 'B01']);
        expect(result.current.items).toEqual([{ code: 'B01', quantity: 2 }]);
        expect(result.current.breakdown.totalCents).toBe(2085);
    });

    it('should clear the basket', () => {
        const { result } = renderHook(() => useBasket());

        act(() => {
            result.current.addProduct('R01');
            result.current.addProduct('G01');
        });

        expect(result.current.addedProductCodes).toHaveLength(2);

        act(() => {
            result.current.clearBasket();
        });

        expect(result.current.addedProductCodes).toHaveLength(0);
        expect(result.current.breakdown.totalCents).toBe(0);
    });
});
