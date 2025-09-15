import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center px-4 py-24">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-400 to-cyan-300">
          Welcome to Our Store
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
          Discover amazing products crafted with quality and care.
        </p>
      </div>
    </main>
  );
}
