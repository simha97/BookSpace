import React, { useState, useRef, useEffect } from "react";
import { Room } from "../types";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

type FilterMenuProps = {
  rooms: Room[];
  selectedRooms: number[];
  setSelectedRooms: React.Dispatch<React.SetStateAction<number[]>>;
};

const FilterMenu = ({
  rooms,
  selectedRooms,
  setSelectedRooms,
}: FilterMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // to close the menu when clicking outside

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const deselectAll = () => setSelectedRooms([]);

  const handleSelectRoom = (roomId: number) => {
    setSelectedRooms((prevSelected) =>
      prevSelected.includes(roomId)
        ? prevSelected.filter((id) => id !== roomId)
        : [...prevSelected, roomId]
    );
  };

  //useEffect to listen to click outside the menu and change the html element
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-60 mb-5" ref={menuRef}>
      <button
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="room-filter-list"
        className="flex w-full items-center justify-between rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm"
        onClick={toggleMenu}
      >
        <span>
          {selectedRooms.length === 0
            ? "Filter Rooms"
            : `${selectedRooms.length} Rooms selected`}
        </span>
        <ChevronUpDownIcon className="size-5 text-gray-500" />
      </button>

      {isOpen && (
        <div
          className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1  ring-3 shadow-2xl ring-black/5 text-sm"
          id="room-filter-list"
          role="listbox"
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative flex cursor-default items-center py-2 pr-9 pl-3 text-sky-800 select-none hover:bg-sky-800 hover:text-white"
              role="option"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSelectRoom(room.id)}
              aria-selected={selectedRooms.includes(room.id)}
              onClick={() => handleSelectRoom(room.id)}
            >
              <span
                className="w-5 h-5 shrink-0 rounded-full"
                style={{ backgroundColor: room.color }}
              />
              <span className="ml-3">{room.name}</span>
              {selectedRooms.includes(room.id) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                  <CheckIcon className="size-5" />
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-between mt-2 px-3 py-2 border-t border-gray-300">
            <button
              className="text-sm text-red-500"
              onClick={deselectAll}
              aria-label="Deselect all filters"
            >
              Deselect All
            </button>
            <button
              className="bg-sky-800 text-white py-1 px-4 rounded-md text-sm"
              onClick={toggleMenu}
              aria-label="Close filter menu"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
