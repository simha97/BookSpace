"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BookingGrid from "./BookingGrid";
import { Room, Booking } from "../types";
import FilterMenu from "./FilterMenu";

type StepBookingProps = {
  updateBooking: (key: keyof Booking, value: string | number) => void;
  booking: Booking;
};

export default function StepBooking({
  updateBooking,
  booking,
}: StepBookingProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<number[]>([]);

  useEffect(() => {
    async function grabData() {
      try {
        const response = await axios.get<Room[]>("http://localhost:5000/rooms");
        if (response.status === 200) {
          setRooms(response.data);
        }
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    }
    grabData();
  }, []);

  return (
    <main>
      <FilterMenu
        rooms={rooms}
        selectedRooms={filteredRooms}
        setSelectedRooms={setFilteredRooms}
      />
      <BookingGrid
        rooms={rooms}
        filteredRooms={filteredRooms}
        updateBooking={updateBooking}
        booking={booking}
      />
    </main>
  );
}
