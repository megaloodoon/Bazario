import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProductItemPrps } from "./ProductItem";
import Addtocart from "./Addtocart";
import { formatNumberWithCommas } from "@/utils/number";



interface ICartItemProps {
  id: number;
  qty: number;
}



export default function CartItem({ id, qty }: ICartItemProps) {

  const [data, setData] = useState({} as IProductItemPrps);

  useEffect(() => {
    axios(`http://localhost:3005/Products/${id}`).then((result) => {
      const { data } = result;
      setData(data);

    })
  }, [id])



  return (
    <div className="grid grid-cols-12 bg-white/5 backdrop-blur rounded-2xl border border-white/10 mb-4 overflow-hidden">
      <div className="col-span-3 md:col-span-2">
        <img className="h-full w-full object-cover" src={data.image} alt={data.title} />
      </div>
      <div className="col-span-9 md:col-span-10 p-6 grid grid-cols-1 gap-2 text-slate-100">
        <h2 className="font-semibold text-lg line-clamp-1">{data.title || 'Product'}</h2>
        <p className="text-sm text-slate-300/80 line-clamp-2">{data.description}</p>
        {/* <p>: <span className="font-medium">{qty}</span></p> */}
        <p>Price: <span className="font-medium">{formatNumberWithCommas(data.price ?? 0)}$</span></p>
        <div className="mt-2">
          <Addtocart id={id.toString()} />
        </div>
      </div>
    </div>

  );
}