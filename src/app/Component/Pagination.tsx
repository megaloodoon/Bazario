"use client"

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Pagination({
	pageCount,
	currentPage = 1,
}: {
	pageCount: number;
	currentPage?: number;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageClick = (e: { selected: number }) => {
		const page = e.selected + 1;
		const params = new URLSearchParams(searchParams.toString());

		params.set('page', page.toString())
		params.set('per_page', "3")

		router.push(`/store?${params.toString()}`); // همون /store?page=...&per_page=3

	};

	return (
		<div className="flex justify-center mt-10">
			<ReactPaginate
				breakLabel="..."
				nextLabel="Next ›"
				previousLabel="‹ Prev"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={1}
				pageCount={pageCount}
				forcePage={Math.max(0, currentPage - 1)}  // ← مهم

				// استایل‌ها
				containerClassName="flex items-center space-x-2 text-slate-200"
				pageClassName="rounded-xl overflow-hidden"
				pageLinkClassName="px-4 py-2 bg-slate-800/50 rounded-xl shadow-md transition-colors hover:bg-indigo-600 hover:cursor-pointer"
				activeClassName="ring-2 ring-indigo-400 rounded-xl"   // روی li
				activeLinkClassName="bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-cyan-400 text-black font-bold cursor-default" // روی a
				previousLinkClassName="px-3 py-2 bg-slate-800/50 rounded-xl shadow-md transition-colors hover:bg-indigo-600 hover:cursor-pointer"
				nextLinkClassName="px-3 py-2 bg-slate-800/50 rounded-xl shadow-md transition-colors hover:bg-indigo-600 hover:cursor-pointer"
				breakLinkClassName="px-3 py-2 cursor-default"
				disabledClassName="opacity-40"
				disabledLinkClassName="cursor-not-allowed"
			/>
		</div>
	);
}

