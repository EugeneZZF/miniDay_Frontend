import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const routes = ["/", "/calendar", "/tasks", "/stats"];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const currentIndex = routes.indexOf(location.pathname);

  const handleDragEnd = (
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    const swipePower = Math.abs(offsetX) * Math.abs(velocityX);
    const threshold = 20000;
    if (swipePower < threshold) return;
    if (offsetX < 0 && currentIndex < routes.length - 1) {
      // свайп влево → следующий экран
      navigate(routes[currentIndex + 1]);
    } else if (offsetX > 0 && currentIndex > 0) {
      // свайп вправо → предыдущий
      navigate(routes[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="
      w-[390px]
      max-h-[844px]
      h-[844px]
      bg-black
      text-white
      
      shadow-2xl
      overflow-hidden
      flex flex-col
      relative
      "
      >
        <header className="flex-shrink-0 flex items-center justify-center">
          Header
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={location.pathname}
              className="h-full overflow-y-auto"
              initial={{ x: 40, opacity: 0 }} // вход слева
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }} // выход вправо
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {" "}
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="w-full flex-shrink-0 flex items-center justify-center bottom-0 ">
          <BottomNav />
        </footer>
      </div>
    </div>
  );
}
