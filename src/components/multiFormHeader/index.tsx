import clsx from "clsx";
import { JsonFormat } from "../../utils/usejsonStructure";
import { TiTick } from "react-icons/ti";

interface IProp {
  currentIndex: number;
}

const MultiFormHeader = ({ currentIndex }: IProp) => {
  return (
    <div className="  my-12 relative ">
      <div className="flex flex-col gap-20 items-end justify-between w-full !py-10">
        {JsonFormat.map((item, index) => {
          const activeIndex = index === currentIndex;
          const isComplete = index < currentIndex;
          return (
            <div key={index} className="inline-flex gap-5 items-center">
              <p
                className={clsx(
                  "font-semibold text-[18px] ",
                  isComplete ? "text-[#5081B9]" : "text-gray-500"
                )}
              >
                {item.status}
              </p>
              <div
                className={clsx(
                  " w-8 h-8 shadow-md shadow-gray-300 rounded-full flex items-center justify-center",
                  activeIndex || isComplete ? "bg-[#5081B9]" : "bg-[#FFF2F2]"
                )}
              >
                {isComplete ? (
                  <TiTick color="white" />
                ) : (
                  <p
                    className={clsx(
                      "font-bold text-[15px]",
                      activeIndex ? "text-white" : "text-black"
                    )}
                  >
                    {index + 1}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className=" absolute top-0 right-0 w-[0.5px] h-full bg-gray-300"></div> */}
    </div>
  );
};

export default MultiFormHeader;
