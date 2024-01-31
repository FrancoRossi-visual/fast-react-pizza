import { useState } from "react";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const [quantity, setQuantity] = useState(1);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity,
      totalPrice: unitPrice * quantity,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && (
            <div className="flex gap-2 sm:gap-8">
              {currentQuantity === 0 ? (
                <Button type="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              ) : (
                <>
                  <UpdateItemQuantity
                    pizzaId={id}
                    pizzaQuantityInCart={currentQuantity}
                  />
                  <DeleteItem pizzaId={id} />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
