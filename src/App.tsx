import {BasketSummary} from './components/basket/BasketSummary'
import {useBasket} from './hooks/useBasket'
import {ProductCatalog} from './components/ProductCatalog/ProductCatalog';

function App() {
    const {addProduct, clearBasket, breakdown, items} = useBasket();

    return (
        <main className="min-h-screen bg-background px-4 py-6">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-4 md:grid-cols-2">
                    <ProductCatalog onAdd={addProduct}/>
                    <div className="space-y-4">
                        <BasketSummary breakdown={breakdown} items={items} onClear={clearBasket}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App
