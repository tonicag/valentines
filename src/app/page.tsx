import HeartBackground from "@/app/(homepage)/components/HeartBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative ">
      <div className="min-h-screen flex flex-col items-center p-2 sm:p-0 z-10">
        <h1 className="text-2xl md:text-4xl font-bold mt-20 mb-10 text-center">
          Create your own <span className="text-pink-700">Valentine's Day</span>{" "}
          card in just a few steps! ❤️
        </h1>
        <p className="text-lg sm:text-2xl text-center text-gray-500 mb-2">
          Create your own Valentine's Day card right now! 🤭🤭
        </p>
        <p className="text-lg sm:text-2xl text-center text-gray-500">
          Valentine's Day is just around the corner! ⌛
        </p>
        <Link
          href="/create"
          className="flex items-center justify-center my-4 font-bold bg-pink-500 text-white shadow hover:bg-pink-600 px-6 h-11 rounded-lg"
        >
          Get started!
        </Link>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold mt-20 mb-10 text-center">
            Customize your card <span className="text-pink-700">however</span>{" "}
            you want 💌
          </h1>
          <Image
            src={"https://i.giphy.com/XxEy4h6YxKE2H5TZ1x.webp"}
            alt="heart"
            width={350}
            height={350}
            className="border-4 border-pink-100 max-w-[550px] w-full h-auto rounded-lg mb-4"
          />
        </div>
      </div>
    </div>
  );
}
