import Container from '@/app/Component/Container';
import ProductItem, { IProductItemPrps, IProductList } from '@/app/Component/ProductItem';
import Link from 'next/link';
import React from 'react';
import Pagination from '../Component/Pagination';
import Search from '../Component/Search';

interface IStoreProps {
  params: {};
  searchParams: { page?: string; per_page?: string; title: string };
}


async function StorePage({ searchParams }: IStoreProps) {

  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? "3";
  const title = searchParams.title ?? "";
  const pageNum = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;



  const result = await fetch(`http://localhost:3005/Products?_page=${page}&_per_page=${per_page}&title=${title} `);
  const data = (await result.json()) as IProductList;





  const products: IProductItemPrps[] = Array.isArray(data) ? data : data.data;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-black text-slate-100">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container>

        <Search />
        <div className="pt-14">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-400 to-cyan-300">Explore The Cosmic Store</h1>
            <p className="mt-3 text-slate-300">Hand‑picked artifacts from the far reaches of the galaxy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {products?.map((p) => (
              <Link key={p.id} href={`/store/${p.id}`} className="block h-full">
                <ProductItem {...p} />
              </Link>
            ))}
          </div>
        </div>
        <Pagination pageCount={data.pages} currentPage={pageNum} />
      </Container>
    </div>
  );
}

export default StorePage;
