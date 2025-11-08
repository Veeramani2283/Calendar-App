import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

export default function EventModal({ isOpen, onClose, dateIso, events = [], onAdd, onDelete }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("12:00");
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setTime("12:00");
      setDuration(60);
    }
  }, [isOpen, dateIso]);

  if (!isOpen) return null;

  const dayEvents = events.filter((e) => e.date === dateIso);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      date: dateIso,
      time,
      duration: Number(duration) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Events — {dateIso ? format(parseISO(dateIso), "EEEE, MMM d, yyyy") : ""}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        {/* Existing Events */}
        <div className="mb-4 max-h-48 overflow-auto space-y-2">
          {dayEvents.length === 0 && <div className="text-sm text-gray-600">No events for this day.</div>}

          {dayEvents.map((ev) => (
            <div key={ev.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <div className="text-sm">
                <div className="font-medium">{ev.title}</div>
                <div className="text-xs text-gray-600">{ev.time} • {ev.duration} min</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(ev.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Event Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="Event title"
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div style={{ width: 110 }}>
              <label className="text-xs text-gray-700">Duration (min)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                min={0}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
