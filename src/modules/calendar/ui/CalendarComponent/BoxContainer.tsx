import { memo } from "react";

type BoxContainerProps = {
  title: string | number;
  color?: string;
  isSelected?: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
  hasEvent?: boolean;
};

const BoxContainer = memo(function BoxContainer({
  title,
  color = "9C9C9C",
  isSelected = false,
  isToday = false,
  isOtherMonth = false,
  hasEvent = false,
}: BoxContainerProps) {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div
        className={`
          flex items-center justify-center
          w-[8.2vw] h-[8.2vw]
          max-w-[50px] max-h-[50px]
          text-[clamp(14px,3vw,24px)]
          font-medium
          select-none
          rounded-[10px]
          ${isToday ? "bg-black text-white scale-[1.2]" : ""}
          ${isSelected && !isToday ? "border-[1px] border-black" : ""}
          ${isOtherMonth ? "opacity-40" : ""}
        `}
        style={isToday ? { color: "#ffffff" } : { color: `#${color}` }}
      >
        <p className={`${isToday ? "mb-[5px] " : ""}`}>{title}</p>
        {(hasEvent || isSelected || isToday) && (
          <div
            className={`
            w-[3px] h-[3px] rounded-full absolute bottom-1.5
            ${isToday ? "bg-white" : "bg-black"}
          `}
          />
        )}
      </div>
    </div>
  );
});

export default BoxContainer;
