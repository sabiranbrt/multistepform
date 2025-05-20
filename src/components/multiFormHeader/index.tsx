import clsx from "clsx";
import { JsonFormat } from "../../utils/usejsonStructure";
import { TiTick } from "react-icons/ti";

interface IProp {
  currentIndex: number;
  steps: string[];
}

const MultiFormHeader = ({ currentIndex, steps }: IProp) => {
  const currentItem = JsonFormat[0];

  return (
    <div className=" my-12">
      <div
        className={clsx(
          "flex items-end w-full !py-10",
          currentItem?.layout === "horizontallayout"
            ? " items-center gap-5 md:gap-4 sm:gap-2 justify-center"
            : "gap-20 flex-col"
        )}
      >
        {currentItem?.section.map((item, index) => {
          const activeIndex = index === currentIndex;
          const isComplete = index < currentIndex;
          return (
            <div
              key={index}
              className={clsx(
                "inline-flex gap-5 items-center",
                currentItem?.layout === "horizontallayout"
                  ? "flex-row-reverse"
                  : ""
              )}
            >
              {index < steps.length - 1 &&
                currentItem?.layout === "horizontallayout" && (
                  <div
                    className={clsx(
                      "h-[0.5px] w-20 2xl:w-20 xl:w-20 mx-2 md:w-10 sm:w-5",
                      index < currentIndex ? "bg-[#5081B9]" : "bg-gray-500"
                    )}
                  />
                )}
              <p
                className={clsx(
                  "font-semibold 2xl:text-[18px] xl:text-[18px] md:text-[14px] sm:text-[12px] whitespace-nowrap",
                  index < currentIndex || activeIndex
                    ? "text-[#5081B9]"
                    : "text-gray-500"
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
                    {item.nos}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiFormHeader;
