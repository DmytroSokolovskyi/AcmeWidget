import { useMemo, useState, useCallback } from 'react';
import type { ProductCode, BasketBreakdown } from '../../core/types.ts';
import {Basket} from '../../core/Basket.ts';
import {defaultCatalog, defaultDeliveryRule, defaultOfferRules} from '../../core/pricingRules.ts';

export interface BasketLineItem {
    code: ProductCode;
    quantity: number;
}

export const useBasket = () => {
    const [addedProductCodes, setAddedProductCodes] = useState<ProductCode[]>([]);

    const computed = useMemo(() => {
        const basket = new Basket({
            catalog: defaultCatalog,
            deliveryRule: defaultDeliveryRule,
            offerRules: defaultOfferRules,
        });

        addedProductCodes.forEach((code) => basket.addProductByCode(code));

        const counts = addedProductCodes.reduce<Record<string, number>>((acc, code) => {
            acc[code] = (acc[code] ?? 0) + 1;
            return acc;
        }, {});

        return {
            breakdown: basket.breakdown(),
            items: Object.entries(counts).map(([code, quantity]) => ({
                code: code as ProductCode,
                quantity
            })),
        };
    }, [addedProductCodes]);

    const addProduct = useCallback((code: ProductCode) => {
        setAddedProductCodes((prev) => [...prev, code]);
    }, []);

    const clearBasket = useCallback(() => {
        setAddedProductCodes([]);
    }, []);

    return {
        addedProductCodes,
        addProduct,
        clearBasket,
        breakdown: computed.breakdown as BasketBreakdown,
        items: computed.items as BasketLineItem[],
    };
};
