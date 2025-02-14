import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">
          Card Not Found 💔
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The valentine card you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/create"
          className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          Create Your Own Card 💌
        </Link>
      </div>
    </div>
  );
}
