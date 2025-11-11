import { useContext } from "react";
import { CartContext } from "../store/CartContextProvider";
import { UserProgressContext } from "../store/UserProgressContextProvider";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { currencyFormatter } from "../utils/currencyFormatter";
import { useHttp } from "../hooks/useHttp";
import Error from "../ui/Error";

let requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalAmount = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("https://food-app-ftf9.onrender.com/orders", requestConfig);

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          customer: customerData,
          items: cartCtx.items,
        },
      })
    );
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Placing Order...</span>;
  }

  if (error) {
    return <Error title="Failed to place order!" message={error} />;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Your Order was Placed Successfully</h2>
        <p>we will update with the delivery information via mail</p>
        <Button onClick={handleFinish}>Okay</Button>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
        <Input labelName="Full_Name" id="name" type="text" />
        <Input labelName="Email_Address" id="email" type="email" />
        <Input labelName="Street" id="street" type="text" />
        <div className="control-row">
          <Input labelName="Postal_Code" id="postal-code" type="text" />
          <Input labelName="City" id="city" type="text" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
