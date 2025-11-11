import { useContext } from "react";

import Button from "../ui/Button";
import { currencyFormatter } from "../utils/currencyFormatter";
import { CartContext } from "../store/CartContextProvider";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function addItem(meal) {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`https://food-app-ftf9.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={()=>addItem(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
