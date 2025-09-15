import Addtocart from '@/app/Component/Addtocart';
import Container from '@/app/Component/Container';
import { IProductItemPrps } from '@/app/Component/ProductItem';
import { notFound } from 'next/navigation';
import React from 'react';

interface IProductProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Product({ params }: IProductProps) {
  const { id } = params;

  const result = await fetch(`http://localhost:3005/Products/${id}`, {
    cache: "no-store",
  });

  if (!result.ok) {
    return notFound();
  }

  const data = (await result.json()) as IProductItemPrps;

  return (
    <Container>
      <div className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-2xl overflow-hidden">
          <div className="md:col-span-5">
            <div className="aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <h2 className="font-extrabold text-3xl md:text-4xl text-slate-100 mb-4">
              {data.title}
            </h2>
            <p className="text-slate-300/90 mb-4">
              {data.description}
            </p>
            <p className="font-bold text-2xl text-indigo-300 mb-6">
              ${data.price.toFixed(2)}
            </p>
            <Addtocart id={id}/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
