import React from "react";
import {
  CalendarDays,
  Home,
  Settings,
  User,
  Users,
  Phone,
  Activity,
  LogOut,
  HelpCircle,
  CreditCard,
  FileBarChart,
  Layers,
  Shield,
} from "lucide-react";
import { format } from "date-fns";

export default function Sidebar({ events = [] }) {
  const todayIso = format(new Date(), "yyyy-MM-dd");
  const todays = events
    .filter((e) => e.date === todayIso)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  return (
    <aside className="w-64 bg-white shadow-xl border-r fixed left-0 top-0 h-screen overflow-y-auto">
      <div className="p-6 flex flex-col min-h-full">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png"
            className="w-10 h-10"
            alt="logo"
          />
          <div>
            <div className="text-lg font-bold text-blue-600">MyCalendar</div>
            <div className="text-xs text-gray-500">Organize your time</div>
          </div>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/120?img=12"
            alt="profile"
            className="w-20 h-20 rounded-full mb-3 shadow-md"
          />
          <h3 className="text-lg font-semibold text-gray-900">Veeramani</h3>
          <p className="text-sm text-gray-500">Product Manager</p>
        </div>

        {/* Main Nav */}
        <nav className="space-y-2">
          <MenuItem icon={<Home size={18} />} title="Dashboard" active />
          <MenuItem icon={<CalendarDays size={18} />} title="Calendar" />
          <MenuItem icon={<Phone size={18} />} title="Contacts" />
          <MenuItem icon={<Users size={18} />} title="Team" />
          <MenuItem icon={<Activity size={18} />} title="Activities" />
          <MenuItem icon={<User size={18} />} title="Users" />
        </nav>

        <div className="border-t my-5"></div>

        {/* Account Section */}
        <div className="text-xs font-semibold text-gray-500 px-3 mb-2">
          ACCOUNT & SYSTEM
        </div>

        <nav className="space-y-2">
          <MenuItem icon={<Settings size={18} />} title="Settings" />
          <MenuItem icon={<HelpCircle size={18} />} title="Help & Support" />
          <MenuItem icon={<CreditCard size={18} />} title="Subscription" />
          <MenuItem icon={<FileBarChart size={18} />} title="Reports" />
          <MenuItem icon={<Layers size={18} />} title="Integrations" />
          <MenuItem icon={<Shield size={18} />} title="Activity Logs" />
        </nav>

        <div className="border-t my-5"></div>

        {/* Today's Meetings */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Today's Meetings
          </h4>

          <div className="space-y-2">
            {todays.length === 0 ? (
              <div className="p-3 bg-blue-50 text-blue-900 rounded-md text-sm">
                No meetings today
              </div>
            ) : (
              todays.slice(0, 4).map((ev) => (
                <div key={ev.id} className="p-2 bg-gray-100 rounded-md">
                  <div className="text-sm font-medium">{ev.title}</div>
                  <div className="text-xs text-gray-500">
                    {ev.time} • {ev.duration} min
                  </div>
                </div>
              ))
            )}

            {todays.length > 4 && (
              <div className="text-xs text-gray-500">
                +{todays.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600">
            <LogOut size={18} /> Logout
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            © 2025 MyCalendar
          </p>
        </div>

      </div>
    </aside>
  );
}

function MenuItem({ icon, title, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition 
        ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
      `}
    >
      <div className="opacity-90">{icon}</div>
      <span className="font-medium">{title}</span>
    </div>
  );
}
