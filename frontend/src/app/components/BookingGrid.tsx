import SlotCard from "./SlotCard";
import { Room, Booking } from "../types";
import { addDays, format } from "date-fns";
import { useState } from "react";

type BookingGridProps = {
  filteredRooms: number[];
  rooms: Room[];
  updateBooking: (key: keyof Booking, value: string | number) => void;
  booking: Booking;
  bookedSlots: Booking[];
};

export default function BookingGrid({
  filteredRooms,
  rooms,
  updateBooking,
  booking,
  bookedSlots,
}: BookingGridProps) {
  const availableSlots = ["09:00-11:00", "11:00-13:00"];
  const [startDate, setStartDate] = useState(new Date());
  const daysToShow = 3;
  const maxDays = 14;
  const latestStart = addDays(new Date(), maxDays - daysToShow);

  const days = Array.from({ length: daysToShow }, (_, i) =>
    format(addDays(startDate, i), "yyyy-MM-dd")
  );

  const visibleRooms =
    filteredRooms.length === 0
      ? rooms
      : rooms.filter((room) => filteredRooms.includes(room.id));

  const slotBooked = (roomId: number, day: string, slot: string) => {
    return bookedSlots.some(
      (booking) =>
        booking.room_id === roomId &&
        booking.date === day &&
        booking.slot === slot
    );
  };

  return (
    <>
      <div className="mb-4 flex justify-center items-center gap-10">
        <button
          disabled={startDate <= new Date()}
          className="text-white font-bold bg-sky-800 rounded-full px-2 py-1 disabled:bg-gray-600"
          aria-label="Previous 3 days"
          onClick={() => {
            if (startDate > new Date()) setStartDate(addDays(startDate, -3));
          }}
        >
          ←
        </button>
        <div className="text-center font-semibold">
          {format(startDate, "MMM d")} -{" "}
          {format(addDays(startDate, daysToShow - 1), "MMM d")}
        </div>
        <button
          disabled={startDate >= latestStart}
          className="text-white font-bold bg-sky-800 rounded-full px-2 py-1 disabled:bg-gray-600"
          aria-label="Next 3 days"
          onClick={() => {
            if (startDate < latestStart) {
              setStartDate(addDays(startDate, 3));
            }
          }}
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-3">
        {days.map((day, index) => (
          <div
            key={day}
            className={`
      border-4 p-2 
      ${index === 0 ? "rounded-l-2xl border-r-0" : ""}
      ${index === 1 ? "rounded-none" : ""}
      ${index === 2 ? "rounded-r-2xl border-l-0" : ""}
      border-gray-300
    `}
          >
            <div
              className="text-sm text-cyan-950 font-bold text-center mb-2 pb-2 border-b border-gray-400"
              aria-label={`Bookings for ${day}`}
            >
              {day}
            </div>

            {availableSlots.map((slot) => (
              <div key={slot} className="mb-2">
                <div
                  className="text-xs font-semibold mb-2 bg-orange-200 text-center rounded-2xl py-1"
                  aria-label={`Slot ${slot}`}
                >
                  {slot}
                </div>

                {visibleRooms.map(
                  (room) =>
                    !slotBooked(room.id, day, slot) && (
                      <SlotCard
                        key={`${room.id}-${slot}`}
                        room={room}
                        isSelected={
                          booking.room_id === room?.id &&
                          booking.slot === slot &&
                          booking.date === day
                        }
                        onSelect={() => {
                          updateBooking("room_id", room?.id || 0);
                          updateBooking("slot", slot);
                          updateBooking("date", day);
                          updateBooking("room_name", room.name);
                        }}
                      />
                    )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
