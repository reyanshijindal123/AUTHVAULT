"use client";

import { useEffect, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // ESC Key Support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-2xl animate-scaleIn relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className=" absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        {title && (
          <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
