"use client"
import { useShoppingCartContext } from "../context/ShoppingCartContext"


interface IAddtoCartProps {
  id: string
}

function Addtocart({ id }: IAddtoCartProps) {
  const { cartItems, handleIncreaseProductQty, handleDecreaseProductQty, getProductQty, handleRemoveProduct } = useShoppingCartContext();

  console.log(cartItems);


  return (
    <div>
      <div className="flex items-center space-x-4 p-2">
        <button onClick={() => handleDecreaseProductQty(parseInt(id))} className="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white">
          -
        </button>
        <span className="text-lg font-semibold">{getProductQty(parseInt(id))}</span>
        <button onClick={() => handleIncreaseProductQty(parseInt(id))} className="px-4 py-2 rounded-2xl bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white">
          +
        </button>
      </div>
      <button onClick={() => handleRemoveProduct(parseInt(id))} className="px-4 py-2 rounded-2xl bg-gray-600 hover:bg-gray-700 transition-colors duration-200 text-white">
        Delete Products
      </button>
    </div>
  )
}

export default Addtocart
