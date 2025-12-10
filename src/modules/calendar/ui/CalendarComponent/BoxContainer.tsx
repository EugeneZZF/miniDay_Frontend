type BoxContainerProps = {
  title: string | number;
  color: string;
};

export default function BoxContainer({ title, color }: BoxContainerProps) {
  return (
    <div
      className="
        flex items-center justify-center
        w-[8.2vw] h-[8.2vw]
        max-w-[50px] max-h-[50px]
         text-[clamp(14px,5vw,24px)]
        font-medium
        select-none
      "
      style={{ color: `#${color}` }}
    >
      {title}
    </div>
  );
}
