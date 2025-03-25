import SlotCard from "./SlotCard";
import { Room, Booking } from "../types";

type BookingGridProps = {
  filteredRooms: number[];
  rooms: Room[];
  updateBooking: (key: keyof Booking, value: string | number) => void;
  booking: Booking;
};

export default function BookingGrid({
  filteredRooms,
  rooms,
  updateBooking,
  booking,
}: BookingGridProps) {
  const availableSlots = ["09:00-11:00", "11:00-13:00"];
  const days = ["2025-03-06", "2025-03-07", "2025-03-08"];

  const visibleRooms =
    filteredRooms.length === 0
      ? rooms
      : rooms.filter((room) => filteredRooms.includes(room.id));

  return (
    <div className="grid grid-cols-3">
      {days.map((day) => (
        <div key={day} className="border p-2">
          <div className="text-sm text-blue-800 font-bold text-center mb-2 pb-2 border-b border-gray-400">
            {day}
          </div>

          {availableSlots.map((slot) => (
            <div key={slot} className="mb-2">
              <div className="text-xs font-semibold mb-1">{slot}</div>

              {visibleRooms.map((room) => (
                <SlotCard
                  key={room.id}
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
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
