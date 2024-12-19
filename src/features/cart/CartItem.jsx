import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { getCurrQuantity, removeItem } from "./cartSlice";
import IncDec from "../menu/IncDec";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currQuantity = getCurrQuantity(pizzaId, useSelector);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        {quantity && <IncDec id={pizzaId} currQuantity={currQuantity} />}
      </div>
    </li>
  );
}

export default CartItem;
