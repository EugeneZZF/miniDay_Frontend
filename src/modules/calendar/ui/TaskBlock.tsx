import { useState } from "react";
import { currentDateString } from "../lib/dateUtils";

export default function TaskBlock() {
  const currentDateTitle = currentDateString();
  return (
    <div className="text-white index h-[6vw] z-20 flex justify-start items-center">
      {currentDateTitle}
    </div>
  );
}
