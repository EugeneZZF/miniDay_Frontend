import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/layout";
import Calendar from "./modules/calendar";
import Statistics from "./modules/statistics";
import TaskBoard from "./modules/taskBoard/ui/TaskBoard";
import Onboarding from "./modules/onboarding";
import QuizPage from "./modules/quizPage";
import { useEffect } from "react";

function App() {
  // стартовое состояние: есть ли класс dark на html
  // const [isDark, setIsDark] = useState(() =>
  //   document.documentElement.classList.contains("dark")
  // );

  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingStatus = localStorage.getItem("onboardingComplete");
    if (onboardingStatus === "true") {
      setIsOnboardingCompleted(true);
    }
  }, []);
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setIsOnboardingCompleted(true);
    navigate("/"); // После завершения анбординга перенаправляем на главную страницу
  };

  // const toggleTheme = () => {
  //   const root = document.documentElement;
  //   const next = !isDark;

  //   if (next) {
  //     root.classList.add("dark");
  //   } else {
  //     root.classList.remove("dark");
  //   }

  //   setIsDark(next);
  // };

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Onboarding />} /> */}
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="/" element={<QuizPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/stats" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
