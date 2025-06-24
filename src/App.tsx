import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { GuitarCard } from "./components/GuitarCard"
import { useCart } from "./hooks/useCart"

function App() {
    const {cart, guitars, handleAddToCart, handleRemoveFromCart, handleDeleteFromCart, handleClearCart, isEmpty, cartTotal} = useCart();

    return (
        <>
            <Header
                cart={cart}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
                handleClearCart={handleClearCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {guitars.map((guitar) => (
                        <GuitarCard
                            key={guitar.id}
                            guitarDetails={guitar}
                            addToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    )
}

export default App
