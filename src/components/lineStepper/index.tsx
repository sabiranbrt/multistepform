import clsx from "clsx";
import { TiTick } from "react-icons/ti";

interface StepperProps {
  currentIndex: number;
  steps: string[];
}

const LineStepper = ({ currentIndex, steps }: StepperProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const activeIndex = index === currentIndex;
        const isComplete = index < currentIndex;

        return (
          <div className=" relative items-center w-full" key={index}>
            <div className="flex flex-col gap-5 items-center justify-end">
              <span className="text-[16px] font-bold mt-2 text-center w-20">
                {label}
              </span>
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

            {index < steps.length - 1 && (
              <div
                className={clsx(
                  "h-1 w-full mx-2 absolute top-18 left-[50%] -z-10",
                  index < currentIndex ? "bg-[#5081B9]" : "bg-[#FFF2F2]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LineStepper;
