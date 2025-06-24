import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"
import { type Guitar } from "../types/types"

export const useCart = () => {



    const [guitars] = useState(db);
    const [cart, setCart] = useState<Guitar[]>([]);

    useEffect(() => {
        const cartFromStorage : Guitar[] = Object.values(localStorage).map(item => JSON.parse(item));
        setCart(cartFromStorage);
    }, []);

    const handleAddToCart: (guitar: Guitar) => void = (guitar: Guitar) => {
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

    const handleRemoveFromCart: (guitar: Guitar) => void = (guitar: Guitar) => {
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

    const handleDeleteFromCart : (guitar: Guitar) => void = (guitar: Guitar) => {
        localStorage.removeItem(guitar.id.toString());
        setCart(Object.values(localStorage).map(item => JSON.parse(item)));
    }

    const handleClearCart : () => void = () => {
        localStorage.clear();
        setCart([]);
    }



    const isEmpty = useMemo(()=> cart.map(guitar=> guitar).length===0, [cart]) // useMemo para que no se renderice cada vez que se actualice el carrito para eliminar el costo de renderizar toda la app completa
    const cartTotal = useMemo (()=> cart.map(guitar => guitar.price * guitar.quantity).reduce((total, price)=> total + price, 0), [cart])

    return {
        cart,
        guitars,
        handleAddToCart,
        handleRemoveFromCart,
        handleDeleteFromCart,
        handleClearCart,
        isEmpty,
        cartTotal
    }
    
}
