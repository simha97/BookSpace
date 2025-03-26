"use client";
import { useState } from "react";
import StepBooking from "./components/StepBooking";
import { Booking } from "./types";
import StepIntro from "./components/StepIntro";
import StepEnterName from "./components/stepEnterName";

export default function Home() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>({
    room_id: 0,
    date: "",
    slot: "",
    booked_by: "",
    room_name: "",
  });

  const updateBooking = (key: keyof Booking, value: string | number) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      [key]: value,
    }));
  };

  return (
    <div className="bg-stone-50 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist">
      {step === 1 && <StepIntro setStep={setStep} />}
      {step === 2 && (
        <StepBooking
          updateBooking={updateBooking}
          booking={booking}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <StepEnterName
          booking={booking}
          updateBooking={updateBooking}
          setStep={setStep}
        />
      )}
    </div>
  );
}
