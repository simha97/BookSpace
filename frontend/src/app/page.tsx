"use client";
import { useState } from "react";
import StepBooking from "./components/StepBooking";
import { Booking } from "./types";

export default function Home() {
  const [booking, setBooking] = useState<Booking>({
    room_id: 0,
    date: "",
    slot: "",
    booked_by: "",
  });
  console.log(booking);

  const updateBooking = (key: keyof Booking, value: string | number) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      [key]: value,
    }));
  };

  return (
    <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <StepBooking updateBooking={updateBooking} booking={booking} />
    </div>
  );
}
