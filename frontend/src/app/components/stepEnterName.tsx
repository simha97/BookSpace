import React, { useState } from "react";
import { Booking } from "../types";
import { Alert } from "@mui/material";
import BookingSuccessModal from "./BookingSuccessModal";

type StepEnterNameProps = {
  booking: Booking;
  updateBooking: (key: keyof Booking, value: string | number) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const StepEnterName = ({
  booking,
  updateBooking,
  setStep,
}: StepEnterNameProps) => {
  const [name, setName] = useState(booking.booked_by || "");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError(true);
    } else {
      setError(false);
      updateBooking("booked_by", name);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              room_id: booking.room_id,
              date: booking.date,
              slot: booking.slot,
              booked_by: name,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("Booking successful!", data);
          setName("");
          setShowModal(true);
        } else {
          console.error("Booking error:", data.error);
        }
      } catch (error) {
        console.error("An error occurred while submitting the booking:", error);
      }
    }
  };

  return (
    <div>
      <BookingSuccessModal
        show={showModal}
        onClose={() => window.location.reload()}
      />
      <div className="mt-5 bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-950 mb-4">
          Please Confirm Your Booking
        </h2>
        <div className="mb-4">
          <h3 className="text-lg text-cyan-950 font-medium">Room Name:</h3>
          <p className="text-gray-600">{booking.room_name}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg text-cyan-950 font-medium">Date:</h3>
          <p className="text-gray-600">{booking.date}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg text-cyan-950 font-medium">Slot:</h3>
          <p className="text-gray-600">{booking.slot}</p>
        </div>
      </div>
      <section aria-labelledby="form-title">
        <h2 id="form-title" className="sr-only">
          Booking form
        </h2>
        <form
          className="px-8 pt-6 pb-8 max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Enter your name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              aria-required="true"
              aria-invalid={error}
              aria-describedby={error ? "name-error" : undefined}
              placeholder="Joe Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error && (
            <Alert severity="error" role="alert">
              Please enter a name.
            </Alert>
          )}

          <div className="flex justify-between">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
            <button
              className="bg-sky-800 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!name}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default StepEnterName;
