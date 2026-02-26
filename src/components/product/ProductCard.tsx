import {Button} from '../ui/Button'
import {Card} from '../ui/Card'
import type {Product} from '../../core/types'
import {formatCurrency} from '../../utils/formatCurrency/formatCurrency'

type ProductCardProps = {
    product: Product
    onAdd: (productCode: string) => void
    isLoading?: boolean
}

const colorMap: Record<string, string> = {
    R01: 'bg-red-500',
    G01: 'bg-green-500',
    B01: 'bg-blue-500',
};

export function ProductCard({product, onAdd, isLoading = false}: ProductCardProps) {
    const dotColor = colorMap[product.code] || 'bg-slate-300';
    return (
        <Card className="overflow-hidden">
            <div className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${dotColor} shadow-sm`} />
                    <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase">{product.code}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(product.unitPriceCents)}
                    </span>
                    <Button onClick={() => onAdd(product.code)} disabled={isLoading}>
                        Add
                    </Button>
                </div>
            </div>
        </Card>
    )
}
