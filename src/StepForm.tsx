import clsx from "clsx";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { default as CustomField } from "./components/CustomField";
import MultiFormHeader from "./components/multiFormHeader";
import { JsonFormat } from "./utils/usejsonStructure";

const StepForm = () => {
  const [index, setIndex] = useState(0);

  const methods = useForm<any>({
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = () => {
    console.log("SUBMITTED");
  };

  const currentItem = JsonFormat[0];
  const currentSection = currentItem?.section[index];

  return (
    <div className="">
      <div className=" !m-5">
        <FormProvider {...methods}>
          <div
            className={clsx(
              " flex-row gap-8",
              currentItem?.layout === "horizontallayout" ? "" : "flex"
            )}
          >
            <div
              className={clsx(
                " relative rounded-md",
                currentItem?.layout === "horizontallayout"
                  ? " !p-5 text-center"
                  : "w-[20%] !p-10 bg-[#F7F7F7]"
              )}
            >
              <div className=" !mb-5">
                <p className=" text-[20px] font-semibold">Fill the form</p>
                <p className="text-[16px]">
                  Follow the steps to make submit form
                </p>
              </div>
              <MultiFormHeader currentIndex={index} />
              <div className=" absolute bottom-0  w-full h-[0.5px] bg-gray-300"></div>
            </div>

            <div
              className={clsx(
                " relative flex flex-col gap-5 !px-8 !py-5",
                currentItem?.layout === "horizontallayout" ? "" : "w-[80%]"
              )}
            >
              <h1 className=" font-semibold text-[20px] text-start !mb-5 text-gray-500">
                {currentSection?.status}
              </h1>
              <div className=" text-start">
                <div
                  className={clsx("md:!grid-cols-2")}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${
                      currentItem?.colGrid ?? 3
                    }, 1fr)`,
                    columnGap: `${currentItem?.gapCol ?? 20}px`,
                    rowGap: `${currentItem?.gapRow ?? 40}px`,
                  }}
                >
                  {currentSection &&
                    currentSection?.displayField?.map((displaylist: any) => {
                      return (
                        <CustomField
                          key={displaylist.key}
                          names={displaylist.key}
                          label={displaylist.label}
                          type={displaylist.subType}
                          isSearchable={displaylist?.isSearchable}
                          // textSecurity={displaylist.textSecurity}
                          focusErrorBgColor={displaylist.focusErrorBgColor}
                          placeHolder={displaylist.placeholder}
                          fieldType={displaylist.fieldType}
                          options={displaylist.dropdownOptions}
                          validation={{
                            required: displaylist.validation.required,
                            pattern: displaylist.validation.pattern,
                            errorMessage: displaylist.validation.errorMessage,
                          }}
                        />
                      );
                    })}
                </div>
                <div className="flex items-center gap-5 !mt-10">
                  {index > 0 && (
                    <button
                      type="button"
                      className="bg-gray-300 text-white !px-4 !py-2 rounded"
                      onClick={() => setIndex((prev) => prev - 1)}
                    >
                      Previous
                    </button>
                  )}
                  {index < currentItem?.section.length - 1 ? (
                    <button
                      type="button"
                      className="bg-[#5081B9] text-white !px-4 !py-2 rounded"
                      onClick={async () => {
                        const isStepValid = await trigger();
                        if (isStepValid) {
                          setIndex((prev) => prev + 1);
                        }
                      }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 text-white !px-4 !py-2 rounded"
                      title="Submit Now"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default StepForm;
