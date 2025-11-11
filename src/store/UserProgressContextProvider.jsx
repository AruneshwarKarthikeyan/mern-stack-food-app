import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{},
});

function UserProgressContextProvider({children}) {
    const[progress, setProgress] = useState('');

    const showCart = () => {
        setProgress('cart');
    }
    
    const hideCart = () => {
        setProgress('');
    }
    
    const showCheckout = () => {
        setProgress('checkout');
    }
    
    const hideCheckout = () => {
        setProgress('');
    }
 
    const userProgressContext = {
        progress: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }
    return <UserProgressContext.Provider value={userProgressContext}>
        {children}
    </UserProgressContext.Provider>
}

export default UserProgressContextProvider;