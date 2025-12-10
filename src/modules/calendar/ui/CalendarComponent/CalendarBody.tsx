import BoxContainer from "./BoxContainer";

export default function CalendarBody() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[501px] flex flex-col  h-[auto] pt-[1rem] ">
        <div className="w-full flex flex-col justify-center bg-amber-100 px-[1rem]">
          <div
            className="
          w-full max-w-[501px] mt-[1vw] mb-[1vw]  border-b-[1px]  border-[#F3F4F6]
           flex  items-center justify-center  
           
        
        "
          >
            <div className="flex justify-between w-[84.77vw] ">
              <BoxContainer title="1" color="9C9C9C" />
              <BoxContainer title="2" color="9C9C9C" />
              <BoxContainer title="3" color="9C9C9C" />
              <BoxContainer title="4" color="9C9C9C" />
              <BoxContainer title="5" color="9C9C9C" />
              <BoxContainer title="6" color="9C9C9C" />
              <BoxContainer title="7" color="9C9C9C" />
            </div>
          </div>
          <div
            className="
          w-full max-w-[501px] mt-[1vw] mb-[1vw]  border-b-[1px]  border-[#F3F4F6]
           flex  items-center justify-center  
           
        
        "
          >
            {/* Первая строка */}
            <div className="flex justify-between w-[84.77vw] ">
              <BoxContainer title="1" color="9C9C9C" />
              <BoxContainer title="2" color="9C9C9C" />
              <BoxContainer title="3" color="9C9C9C" />
              <BoxContainer title="4" color="9C9C9C" />
              <BoxContainer title="5" color="9C9C9C" />
              <BoxContainer title="6" color="9C9C9C" />
              <BoxContainer title="7" color="9C9C9C" />
            </div>

            {/* Вторая строка */}
          </div>
        </div>
      </div>
    </div>
  );
}
