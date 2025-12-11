import React, { useState } from "react";
import { motion } from "framer-motion";

type OnboardingProps = {
  onComplete: () => void;
};
export default function Onboarding({ onComplete }) {
  return <div className="w-full bg-amber-50">Task board</div>;
}
