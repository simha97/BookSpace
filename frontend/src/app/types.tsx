export type Room = {
  id: number;
  name: string;
  capacity: number;
  color: string;
};

export type Booking = {
  id?: number;
  room_id: number;
  date: string;
  slot: string;
  booked_by: string;
};
