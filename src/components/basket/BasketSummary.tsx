import {Card} from '../ui/Card'
import {Button} from '../ui/Button'
import {formatCurrency} from '../../utils/formatCurrency/formatCurrency'
import type {BasketBreakdown} from '../../core/types'
import {defaultCatalog} from '../../core/pricingRules'

type BasketItem = { code: string; quantity: number };

type BasketSummaryProps = {
    items: BasketItem[];
    breakdown: BasketBreakdown;
    onClear?: () => void;
};

export function BasketSummary({items, breakdown, onClear}: BasketSummaryProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">Basket summary</h2>
                {onClear && items.length > 0 && (
                    <Button variant="danger" size="sm" onClick={onClear}>
                        Clear
                    </Button>
                )}
            </div>

            {items.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Your basket is empty.</p>
            ) : (
                <ul className="mt-4 space-y-2">
                    {items.map((item) => {
                        const product = defaultCatalog.byCode[item.code];
                        return (
                            <li key={item.code} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {product?.name || item.code} x{item.quantity}
                                </span>
                                <span className="font-medium text-foreground">
                                    {formatCurrency((product?.unitPriceCents || 0) * item.quantity)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatCurrency(breakdown.subtotalCents)}</span>
                </div>

                {breakdown.discountCents > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium text-success">
                            -{formatCurrency(breakdown.discountCents)}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">{formatCurrency(breakdown.deliveryCents)}</span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(breakdown.totalCents)}
                    </span>
                </div>
            </div>
        </Card>
    );
}
