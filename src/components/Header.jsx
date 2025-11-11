import { useContext } from 'react';

import logo from '../assets/logo.jpg'
import Button from '../ui/Button';
import { CartContext } from '../store/CartContextProvider';
import { UserProgressContext } from '../store/UserProgressContextProvider';

function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartSize = cartCtx.items.reduce((total, item) => total + item.quantity , 0);

    function handleCart() {
        userProgressCtx.showCart();
    }

    return <header id='main-header'>
        <div id='title'>
            <img src={logo} alt="main-logo" />
            <h1>Buy-N-Bite</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleCart}>Cart({totalCartSize})</Button>
        </nav>
    </header>
}

export default Header;