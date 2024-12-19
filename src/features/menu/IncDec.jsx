import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem, removeItem } from "../cart/cartSlice";

function IncDec({ currQuantity, id }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeItem(id));
  }

  function handleInc() {
    dispatch(increaseItem(id));
  }

  function handleDec() {
    dispatch(decreaseItem(id));
  }
  return (
    <div>
      <Button type="small" onClick={handleDec} disabled={currQuantity === 1}>
        -
      </Button>
      <span style={{ margin: "0 10", fontSize: "15px" }}>{currQuantity}</span>
      <Button type="small" onClick={handleInc}>
        +
      </Button>
      <Button type="small" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default IncDec;
