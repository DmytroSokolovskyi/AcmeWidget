export type ProductCode = 'R01' | 'G01' | 'B01' | (string & {});

export interface Product {
    code: ProductCode;
    name: string;
    unitPriceCents: number;
}

export interface ProductCatalog {
    byCode: Record<string, Product>;
}

export interface DeliveryRule {
    name: string;
    calculateDeliveryCents: (subtotalAfterDiscountCents: number) => number;
}

export interface OfferContext {
    itemCounts: Record<string, number>;
    catalog: ProductCatalog;
}

export interface OfferRule {
    name: string;
    calculateDiscountCents: (context: OfferContext) => number;
}

export interface BasketBreakdown {
    subtotalCents: number;
    discountCents: number;
    deliveryCents: number;
    totalCents: number;
}
