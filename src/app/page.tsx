import MainPage from "@/app/(homepage)/components/main-page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-2 sm:p-0 z-10">
      <h1 className="text-2xl md:text-4xl font-bold mt-20 mb-10 text-center">
        Create a Valentine&apos;s card for your special someone! ❤️
      </h1>
      <p className="text-lg text-center mb-10">
        Let&apos;s make this Valentine&apos;s Day unforgettable with a
        personalized card!
      </p>
      <p className="text-sm text-center text-gray-600">
        It&apos;s free and takes less than a minute.
      </p>
      <MainPage />
    </div>
  );
}
