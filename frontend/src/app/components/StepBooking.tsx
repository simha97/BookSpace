"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BookingGrid from "./BookingGrid";
import { Room, Booking } from "../types";
import FilterMenu from "./FilterMenu";
import Alert from "@mui/material/Alert";

type StepBookingProps = {
  updateBooking: (key: keyof Booking, value: string | number) => void;
  booking: Booking;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function StepBooking({
  updateBooking,
  booking,
  setStep,
}: StepBookingProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<number[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Booking[]>([]);
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function grabRooms() {
      try {
        const response = await axios.get<Room[]>(
          `${process.env.NEXT_PUBLIC_API}/rooms`
        );
        if (response.status === 200) {
          setRooms(response.data);
        }
      } catch (error) {
        console.log("Error fetching rooms:", error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    grabRooms();
  }, []);

  useEffect(() => {
    async function grabBookings() {
      try {
        const response = await axios.get<Booking[]>(
          `${process.env.NEXT_PUBLIC_API}/bookings`
        );
        if (response.status === 200) {
          setBookedSlots(response.data);
        }
      } catch (error) {
        console.log("Error fetching rooms:", error);
        setFetchError(true);
      }
    }
    grabBookings();
  }, []);

  const handleNext = () => {
    if (booking.date) {
      setStep((prev) => prev + 1);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <main>
      <FilterMenu
        rooms={rooms}
        selectedRooms={filteredRooms}
        setSelectedRooms={setFilteredRooms}
      />
      {fetchError && (
        <Alert severity="error" className="my-4" role="alert">
          Failed to load room data. Please try again later.
        </Alert>
      )}
      {loading ? (
        <p className="text-center my-4 text-gray-500">Loading rooms...</p>
      ) : (
        <BookingGrid
          rooms={rooms}
          filteredRooms={filteredRooms}
          updateBooking={updateBooking}
          booking={booking}
          bookedSlots={bookedSlots}
        />
      )}
      {error && (
        <Alert severity="error" role="alert">
          Please choose a slot.
        </Alert>
      )}
      <div className="flex">
        <button
          className="w-full ml-auto max-w-xs mt-2 bg-sky-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-cyan-950 transition-all"
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </main>
  );
}
