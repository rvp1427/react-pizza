// Test ID: IIDSAT

import OrderItem from "./OrderItem";

import { Form, useActionData, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import Button from "../../ui/Button";

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const updatedData = useActionData();
  const newpriority = updatedData?.data.priority || priority;
  console.log(updatedData?.data);

  return (
    <Form className="space-y-8 px-4 py-6" method="PATCH">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {newpriority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {newpriority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <input
        type="hidden"
        name="priority"
        value={JSON.stringify({ id, priority })}
      />
      {!newpriority && (
        <Button type="primary" name="yes">
          Make Priority
        </Button>
      )}
    </Form>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function orderAction({ request }) {
  const data = await request.formData();
  const data2 = JSON.parse(Object.fromEntries(data).priority);
  const updateObj = {
    ...data2,
    priority: data2.priority === false,
  };
  const id = updateObj.id;

  const updatedData = await updateOrder(id, updateObj);
  console.log(updatedData);

  return updatedData;
}

export default Order;
