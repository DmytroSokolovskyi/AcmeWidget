import type {Product} from '../../core/types'
import {ProductCard} from '../product/ProductCard'

type CatalogGridProps = {
    products: Product[];
    onAdd: (productCode: string) => void;
    loadingIds?: Set<string>;
};

export function CatalogGrid({products, onAdd, loadingIds}: CatalogGridProps) {
    if (products.length === 0) {
        return <p className="text-sm text-muted-foreground">No products available.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product.code}
                    product={product}
                    onAdd={onAdd}
                    isLoading={loadingIds?.has(product.code) ?? false}
                />
            ))}
        </div>
    );
}
