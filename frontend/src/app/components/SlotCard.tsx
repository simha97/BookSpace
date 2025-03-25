import React from "react";
import { Room } from "../types";

type SlotCardProps = {
  room: Room;
  onSelect: () => void;
  isSelected: boolean;
};

const SlotCard = ({ room, onSelect, isSelected }: SlotCardProps) => {
  return (
    <div
      className={`flex items-center text-sm mb-2 h-12 rounded-[4px] cursor-pointer transition-colors duration-200 ${
        isSelected ? "bg-blue-300" : "bg-blue-100"
      }`}
      onClick={onSelect}
    >
      <div
        className="w-2 h-full rounded-tl-[4px] rounded-bl-[4px]"
        style={{ backgroundColor: room.color }}
      ></div>
      <div className="p-1">
        <div>{room.name}</div>
        <div>({room.capacity})</div>
      </div>
    </div>
  );
};

export default SlotCard;
