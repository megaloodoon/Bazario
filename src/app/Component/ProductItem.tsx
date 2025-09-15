import React from "react";


export interface IProductItemPrps {
  id: string,
  image: string,
  title: string,
  description: string,
  price: number,
}


export interface IProductList {
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
  data: IProductItemPrps[]
}

export default function ProductItem({ image, title, description, price }: IProductItemPrps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(99,102,241,0.35)]">
      <div className="absolute -inset-16 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.15),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold tracking-tight text-slate-100 line-clamp-1">{title}</h3>
        <div className="mt-1 text-indigo-300 font-bold">${price.toFixed(2)}</div>
        <p className="mt-2 text-sm text-slate-300/80 line-clamp-2">{description}</p>
      </div>
    </div>
  )
}