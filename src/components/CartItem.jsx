import { currencyFormatter } from "../utils/currencyFormatter";

function CartItem({name, price, quantity, onDecrease, onIncrease}) {

    return <li className="cart-item">
        <p>{name} - {currencyFormatter.format(price)} X {quantity}</p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}

export default CartItem;