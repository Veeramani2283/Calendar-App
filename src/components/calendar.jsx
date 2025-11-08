import React, { useState } from "react";
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

export default function Calendar({ events = [], onDayClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const cells = [];
  let day = startDate;
  while (day <= endDate) {
    const formattedDate = format(day, "yyyy-MM-dd");
    const dayEvents = events.filter((ev) => ev.date === formattedDate);

    cells.push(
      <div
        key={formattedDate}
        onClick={() => onDayClick && onDayClick(formattedDate)}
        className={`
          h-44 p-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer flex flex-col
          ${isSameMonth(day, monthStart) ? "" : "bg-gray-100 text-gray-400"}
        `}
      >
        <div className="flex justify-between mb-2 items-center">
          <span
            className={`text-lg font-medium ${
              isSameDay(day, new Date()) ? "text-blue-600 font-bold" : ""
            }`}
          >
            {format(day, "d")}
          </span>
          {isSameDay(day, new Date()) && (
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden">
          {dayEvents.slice(0, 3).map((ev, i) => (
            <div
              key={ev.id}
              className={`px-2 py-1 text-xs rounded-md truncate font-medium
                ${
                  i === 0
                    ? "bg-blue-100 text-blue-800"
                    : i === 1
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }
              `}
            >
              {ev.time} — {ev.title}
            </div>
          ))}

          {dayEvents.length > 3 && (
            <div className="text-xs text-gray-600">+{dayEvents.length - 3} more</div>
          )}
        </div>
      </div>
    );

    day = addDays(day, 1);
  }

  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="flex justify-between items-center mb-6 px-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition"
        >
          ← Previous
        </button>

        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-4 border-b pb-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-lg tracking-wide">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">{cells}</div>
    </div>
  );
}
