import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { GuitarCard } from "./components/GuitarCard"
import { db, type Guitar } from "./data/db"

function App() {
    const [guitars] = useState(db);
    const [cart, setCart] = useState<Guitar[]>([]);

    useEffect(() => {
        const cartFromStorage = Object.values(localStorage).map(item => JSON.parse(item));
        setCart(cartFromStorage);
    }, []);

    const handleAddToCart = (guitar: Guitar) => {
        const guitarInCart = localStorage.getItem(guitar.id.toString());
        if (guitarInCart) {
            const updatedGuitar = JSON.parse(guitarInCart);
            updatedGuitar.quantity += 1;
            localStorage.setItem(guitar.id.toString(), JSON.stringify(updatedGuitar));
            const cartFromStorage = Object.values(localStorage).map(item => JSON.parse(item));
            setCart(cartFromStorage);
        } else {
            const newGuitar = { ...guitar, quantity: 1 };
            localStorage.setItem(guitar.id.toString(), JSON.stringify(newGuitar));
            const cartFromStorage = Object.values(localStorage).map(item => JSON.parse(item));
            setCart(cartFromStorage);
        }
    }

    const handleRemoveFromCart = (guitar: Guitar) => {
        const guitarInCart = localStorage.getItem(guitar.id.toString());
        if (guitarInCart) {
            const updatedGuitar = JSON.parse(guitarInCart);
            if (updatedGuitar.quantity > 1) {
                updatedGuitar.quantity -= 1;
                localStorage.setItem(guitar.id.toString(), JSON.stringify(updatedGuitar));
            } else {
                localStorage.removeItem(guitar.id.toString());
            }
            setCart(Object.values(localStorage).map(item => JSON.parse(item)));
        }
    }

    const handleDeleteFromCart = (guitar: Guitar) => {
        localStorage.removeItem(guitar.id.toString());
        setCart(Object.values(localStorage).map(item => JSON.parse(item)));
    }

    return (
        <>
            <Header
                cart={cart}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
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
