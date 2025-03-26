"use client";
import React from "react";

type BookingSuccessModalProps = {
  show: boolean;
  onClose: () => void;
};

const BookingSuccessModal = ({ show, onClose }: BookingSuccessModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white max-w-sm w-full p-6 rounded-xl shadow-2xl relative">
        <h2 className="text-xl font-semibold text-green-700 mb-3 text-center">
          Success!
        </h2>
        <p className="text-gray-700 text-center">
          Your booking was successful.
        </p>
        <button
          className="mt-6 block mx-auto bg-sky-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-950 transition"
          onClick={onClose}
          aria-label="Close booking success message"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
