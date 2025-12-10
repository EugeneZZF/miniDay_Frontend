import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import Calendar from "../modules/calendar";
// import Onboarding from "../modules/onboarding";
import TaskBoard from "../modules/taskBoard";
import Statistics from "../modules/statistics";
import QuizPage from "../modules/quizPage";

const routes = ["/", "/calendar", "/tasks", "/stats"];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [hasSwiped, setHasSwiped] = useState(false); // Флаг для отслеживания свайпов
  const screens = [
    { path: "/quizPage", element: <QuizPage /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/tasks", element: <TaskBoard /> },
    { path: "/stats", element: <Statistics /> },
  ];
  const currentIndex = useMemo(
    () =>
      Math.max(
        0,
        screens.findIndex((s) => s.path === location.pathname)
      ),
    [location.pathname, screens]
  );

  const x = useMotionValue(-currentIndex * screenWidth); // для динамической ширины экрана
  const controls = useAnimation(); // Контроллер для анимации

  useEffect(() => {
    controls.start({ x: -currentIndex * screenWidth }); // Начинаем анимацию при изменении индекса экрана
  }, [currentIndex, controls, screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDragEnd = (
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (hasSwiped) return; // если уже свайпнули, не продолжаем

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    const swipePower = Math.abs(offsetX) * Math.abs(velocityX);
    const threshold = 10000;

    let targetIndex = currentIndex;

    if (swipePower > threshold) {
      if (offsetX < 0 && currentIndex < screens.length - 1) {
        // свайп влево → следующий экран
        targetIndex = currentIndex + 1;
      } else if (offsetX > 0 && currentIndex > 0) {
        // свайп вправо → предыдущий
        targetIndex = currentIndex - 1;
      }
    }

    // Анимируем возврат на текущий экран если свайп слабый
    if (targetIndex === currentIndex) {
      controls.start({ x: -currentIndex * screenWidth });
    }

    if (targetIndex !== currentIndex) {
      navigate(screens[targetIndex].path); // переход к новому экрану
      setHasSwiped(true); // блокируем дальнейшие свайпы
    }
  };

  // Сбрасываем флаг hasSwiped при изменении пути
  useEffect(() => {
    setHasSwiped(false);
  }, [location.pathname]);

  return (
    // внешний контейнер занимает всю высоту экрана и скрывает оверфлоу страницы
    <div className="h-screen overflow-y-scroll overflow-x-hidden flex items-center justify-center bg-white">
      <div
        className="
        
          max-w-full
          bg-black
          text-white
          shadow-2xl
          overflow-x-hidden
          overflow-y-scroll
          flex flex-col
          relative
          h-full
          w-full
        "
      >
        {/* <header className="flex-shrink-0 flex items-center justify-center">
          Header
        </header> */}

        <main className="flex-1  overflow-x-hidden overflow-y-scroll">
          <AnimatePresence initial={false}>
            <motion.div
              key={location.pathname}
              className="flex h-full"
              drag="x"
              dragConstraints={{
                left: -screenWidth * (screens.length - 1),
                right: 0,
              }}
              style={{ x }}
              onDragEnd={handleDragEnd}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              animate={controls} // Используем контроллер для анимации
            >
              {screens.map((screen) => (
                <div
                  key={screen.path}
                  className="w-full shrink-0 grow-0 h-full"
                >
                  {screen.element}
                </div>
              ))}
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
