import React from "react";
import { Search, Bell, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full bg-white h-16 flex items-center justify-between px-6 border-b shadow-sm">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Menu className="md:hidden block cursor-pointer" />

        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png"
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold text-blue-600">MyCalendar</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            className="border rounded-lg pl-10 pr-3 py-2 text-sm w-64"
            placeholder="Search..."
          />
        </div>

        {/* Notification */}
        <Bell size={22} className="text-gray-700 cursor-pointer" />

        {/* Profile quick icon */}
        <img
          src="https://i.pravatar.cc/40?img=12"
          className="w-10 h-10 rounded-full cursor-pointer shadow"
        />
      </div>
    </div>
  );
}
