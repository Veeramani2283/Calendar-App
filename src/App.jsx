import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Calendar from "./components/calendar";
import EventModal from "./components/EventModal";
import initialEvents from "./data/events.json";

const STORAGE_KEY = "calendar_events_v1";

export default function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month"); // "month" | "week" | "day"
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [toast, setToast] = useState("");

  // ✅ Load saved events or fallback to JSON
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
        return;
      } catch {}
    }
    setEvents(initialEvents);
  }, []);

  // ✅ Save events on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // ✅ Open modal when user clicks a date
  const handleDayClick = (dateIso) => {
    setSelectedDate(dateIso);
    setModalOpen(true);
  };

  // ✅ Add event
  const addEvent = (ev) => {
    const newEvent = { id: Date.now(), ...ev };
    setEvents((prev) => [...prev, newEvent]);

    // ✅ Toast notification
    setToast("✅ Event added successfully!");
    setTimeout(() => setToast(""), 2200);

    setModalOpen(false);
  };

  // ✅ Delete event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">

      {/* ✅ Sidebar (full-height) */}
      <Sidebar events={events} />

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">


        {/* ✅ Navbar */}
        <Navbar setView={setView} view={view} />

        {/* ✅ Page Content */}
        <main className="p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Calendar
              events={events}
              onDayClick={handleDayClick}
              view={view}
            />
          </div>
        </main>
      </div>

      {/* ✅ Event Modal */}
      <EventModal
        isOpen={modalOpen}
        dateIso={selectedDate}
        events={events}
        onClose={() => setModalOpen(false)}
        onAdd={addEvent}
        onDelete={deleteEvent}
      />

      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-[999]">
          {toast}
        </div>
      )}
    </div>
  );
}
