import CreateCardForm from "@/app/(create)/create/components/create-card-form";

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-2 sm:p-0 z-10">
      <h1 className="text-2xl md:text-4xl font-bold mt-20 mb-10 text-center">
        Enter the details to create your{" "}
        <span className="text-pink-700">card!</span> ❤️
      </h1>
      <CreateCardForm />
    </div>
  );
}
