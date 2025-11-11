import { useContext } from "react";
import Modal from "../ui/Modal";
import { CartContext } from "../store/CartContextProvider";
import Button from "../ui/Button";
import { UserProgressContext } from "../store/UserProgressContextProvider";
import { currencyFormatter } from "../utils/currencyFormatter";
import CartItem from "./CartItem";

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalPrice = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGotoCheckout() {
        userProgressCtx.showCheckout();
    }
    
    return <Modal open={userProgressCtx.progress === 'cart'} className="cart" onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {
                cartCtx.items.map((item) => <CartItem key={item.id} {...item} onDecrease={() => cartCtx.removeItem(item.id)} onIncrease={() => cartCtx.addItem(item)} />)
            }
        </ul>
        <p className="cart-total">Total Price: {currencyFormatter.format(totalPrice)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>close</Button>
            {cartCtx.items.length > 0 && <Button onClick={handleGotoCheckout}>Go to Checkout</Button>}
        </p>
    </Modal>
}

export default Cart;