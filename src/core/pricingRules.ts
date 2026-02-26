import type { DeliveryRule, OfferRule, ProductCatalog } from './types';

export const defaultCatalog: ProductCatalog = {
    byCode: {
        R01: { code: 'R01', name: 'Red Widget', unitPriceCents: 3295 },
        G01: { code: 'G01', name: 'Green Widget', unitPriceCents: 2495 },
        B01: { code: 'B01', name: 'Blue Widget', unitPriceCents: 795 },
    },
};

export const defaultDeliveryRule: DeliveryRule = {
    name: 'tiered-delivery',
    calculateDeliveryCents(subtotalAfterDiscountCents) {
        if (subtotalAfterDiscountCents <= 0) return 0;
        if (subtotalAfterDiscountCents < 5000) return 495;
        if (subtotalAfterDiscountCents < 9000) return 295;
        return 0;
    },
};

export const defaultOfferRules: OfferRule[] = [
    {
        name: 'red-widget-second-half-price',
        calculateDiscountCents({ itemCounts, catalog }) {
            const redCount = itemCounts.R01 ?? 0;
            if (redCount < 2) return 0;

            const redPrice = catalog.byCode.R01?.unitPriceCents ?? 0;
            const discountedItems = Math.floor(redCount / 2);
            return discountedItems * Math.floor(redPrice / 2);
        },
    },
];

export const formatUsd = (cents: number): string => `$${(cents / 100).toFixed(2)}`;
