import { NavLink } from "react-router-dom";
import {
  SunMedium,
  CalendarDays,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const navItems = [
  { to: "/", icon: SunMedium, label: "Day" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
  { to: "/tasks", icon: ClipboardList, label: "Tasks" },
  { to: "/stats", icon: BarChart3, label: "Stats" },
];

export default function BottomNav() {
  return (
    <nav className=" w-full grid grid-cols-4 h-16 border-t border-zinc-300">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "flex items-center justify-center w-full h-full",
              "text-black",
              isActive ? "bg-black text-white" : "bg-white",
            ].join(" ")
          }
        >
          <span className="sr-only">{label}</span>
          <Icon className="w-8 h-8" />
        </NavLink>
      ))}
    </nav>
  );
}
