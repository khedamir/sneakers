import { useContext } from "react"
import DataContext from "../context/DataContext"


export const useCart = () => {
    const {cartItems, setCartItems} = useContext(DataContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return {cartItems, setCartItems, totalPrice}
}