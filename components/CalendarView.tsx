"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  return (
    <div className="bg-white p-4 rounded-3xl">
      <Calendar />
    </div>
  );
}