import {defaultCatalog} from '../../core/pricingRules'
import {ProductCard} from '../product/ProductCard'


export const ProductCatalog = ({onAdd}: { onAdd: (code: string) => void }) => {
    const products = Object.values(defaultCatalog.byCode);

    return (
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Products</h2>

            <div className="grid gap-3">
                {products.map((product) => (
                    <ProductCard key={product.code} product={product} onAdd={onAdd}/>
                ))}
            </div>
        </section>
    );
};
