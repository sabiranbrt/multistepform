import clsx from "clsx";
import { JsonFormat } from "../../utils/usejsonStructure";

interface IProp {
  currentIndex: number;
}

const MultiFormHeader = ({ currentIndex }: IProp) => {
  return (
    <div className="  my-12 relative ">
      <div className="flex flex-col gap-20 items-start justify-between w-full !py-10">
        {JsonFormat.map((item, index) => {
          const activeIndex = index === currentIndex;
          return (
            <div className="inline-flex gap-2.5 items-center">
              <div
                className={clsx(
                  " w-10 h-10 shadow-md shadow-gray-300 rounded-md flex items-center justify-center",
                  activeIndex ? "bg-[#0D77FC]" : "bg-[#FFF2F2]"
                )}
              >
                <p className={clsx(activeIndex ? "text-white" : "text-black")}>
                  {index + 1}
                </p>
              </div>
              <p className=" font-semibold text-[20px] text-gray-700">
                {item.status}
              </p>
            </div>
          );
        })}
      </div>
      <div className=" absolute top-0 right-[9px] w-[0.5px] h-full bg-gray-300"></div>
    </div>
  );
};

export default MultiFormHeader;
