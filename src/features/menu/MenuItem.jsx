import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  decreaseItem,
  getCurrQuantity,
  increaseItem,
  removeItem,
} from "../cart/cartSlice";
import { useState } from "react";
import IncDec from "./IncDec";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const [isActive, setIsActive] = useState(true);

  const currQuantity = getCurrQuantity(id, useSelector);
  console.log(currQuantity);
  const dispatch = useDispatch();

  function handleAdd() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    setIsActive(false);
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
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {currQuantity && <IncDec currQuantity={currQuantity} id={id} />}
          {!soldOut && !currQuantity && (
            <Button type="small" onClick={handleAdd}>
              Add to cart
            </Button>
          )}

          {/* {!soldOut && !isActive && (
            <>
              <IncDec id={id} setIsActive={setIsActive} />
            </>
          )} */}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
