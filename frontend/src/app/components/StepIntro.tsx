type StepOneProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function StepOne({ setStep }: StepOneProps) {
  return (
    <div className="flex flex-col h-screen items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-sky-800 text-center mb-2">
        Welcome to Room Booking
      </h1>

      <p className="text-gray-600 text-center mb-6 max-w-sm">
        Book a room in just a few clicks. Lets get started!
      </p>
      <button
        className="w-full max-w-xs bg-sky-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-cyan-950 transition-all"
        onClick={() => setStep((prev) => prev + 1)}
      >
        Next →
      </button>
    </div>
  );
}
