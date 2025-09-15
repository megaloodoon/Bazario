"use client";
import Container from "../Component/Container";
import CartItem from "../Component/CartItem";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItemPrps } from "../Component/ProductItem";
import { formatNumberWithCommas } from "@/utils/number";

interface IDiscountData { id; number, code; string, percentage; number }

function Cart() {
  const { cartItems } = useShoppingCartContext();
  const [data, setData] = useState<IProductItemPrps[]>();
  const [discountCode, setDiscountCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    axios(`http://localhost:3005/Products`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  let totalprice = cartItems.reduce((total, item) => {
    let selectedProduct = data?.find(
      (product) => product.id == item.id.toString()
    );
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:3005/discounts?code=${discountCode}`).then(
      (result) => {
        const { data } = result as IDiscountData[];
        let discountPrice = totalprice * data[0].percentage / 100;
        let finalPrice = totalprice - discountPrice
        setFinalPrice(finalPrice)
        setDiscountPrice(discountPrice)
      }
    );
  };

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

        <div className="m-1 ">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="border rounded-lg shadow-md bg-white p-6 space-y-4 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-700">
            Total price:{" "}
            <span className="font-normal ml-2">
              {formatNumberWithCommas(totalprice)}$
            </span>
          </h3>
          <h3 className="text-xl font-semibold text-green-700">
            Your profit from this purchase:{" "}
            <span className="font-normal ml-2">{discountPrice}$</span>
          </h3>
          <h3 className="text-xl font-semibold text-green-700/80">
            Amount paid: <span className="font-normal ml-2">{finalPrice}$</span>
          </h3>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Enter discount code"
              className="flex-1 border text-blue-400 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              onClick={handleSubmitDiscount}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              Enter
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
