import type {
    BasketBreakdown,
    DeliveryRule,
    OfferRule,
    ProductCatalog,
    ProductCode,
} from './types';

interface BasketConfig {
    catalog: ProductCatalog;
    deliveryRule: DeliveryRule;
    offerRules: OfferRule[];
}

export class Basket {
    private readonly catalog: ProductCatalog;
    private readonly deliveryRule: DeliveryRule;
    private readonly offerRules: OfferRule[];
    private readonly addedProductCodes: ProductCode[] = [];

    constructor(config: BasketConfig) {
        this.catalog = config.catalog;
        this.deliveryRule = config.deliveryRule;
        this.offerRules = config.offerRules;
    }

    addProductByCode(code: ProductCode): void {
        if (!this.catalog.byCode[code]) {
            throw new Error(`Unknown product code: ${code}`);
        }

        this.addedProductCodes.push(code);
    }

    private countItems(): Record<string, number> {
        return this.addedProductCodes.reduce<Record<string, number>>((acc, code) => {
            acc[code] = (acc[code] ?? 0) + 1;
            return acc;
        }, {});
    }

    breakdown(): BasketBreakdown {
        if (this.addedProductCodes.length === 0) {
            return {
                subtotalCents: 0,
                discountCents: 0,
                deliveryCents: 0,
                totalCents: 0,
            };
        }

        const itemCounts = this.countItems();

        const subtotalCents = Object.entries(itemCounts).reduce((sum, [code, quantity]) => {
            const unitPriceCents = this.catalog.byCode[code].unitPriceCents;
            return sum + unitPriceCents * quantity;
        }, 0);

        const discountCents = this.offerRules.reduce(
            (sum, rule) => sum + rule.calculateDiscountCents({ itemCounts, catalog: this.catalog }),
            0
        );

        const subtotalAfterDiscountCents = Math.max(0, subtotalCents - discountCents);
        const deliveryCents = this.deliveryRule.calculateDeliveryCents(subtotalAfterDiscountCents);

        return {
            subtotalCents,
            discountCents,
            deliveryCents,
            totalCents: subtotalAfterDiscountCents + deliveryCents,
        };
    }

    totalCents(): number {
        return this.breakdown().totalCents;
    }

    total(): number {
        return this.totalCents() / 100;
    }
}
