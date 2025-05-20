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
    <div className=" h-dvh">
      <FormProvider {...methods}>
        <div
          className={clsx(
            " h-full flex-row gap-8",
            currentItem?.layout === "horizontallayout" ? "bg-[#F2F2F2]" : "flex"
          )}
        >
          <div
            className={clsx(
              " relative rounded-md",
              currentItem?.layout === "horizontallayout"
                ? " !p-5 text-center !mb-5"
                : "w-[20%] !p-10 bg-[#F7F7F7]"
            )}
          >
            <div className=" !mb-4">
              <p className=" text-[20px] font-semibold">Fill the form</p>
              <p className="text-[16px]">
                Follow the steps to make submit form
              </p>
            </div>

            <MultiFormHeader
              currentIndex={index}
              steps={currentItem.section.map(
                (s: any) => s.status || `Step ${s.step}`
              )}
            />
          </div>

          <div
            className={clsx(
              " relative flex flex-col gap-5 !px-8 !py-5",
              currentItem?.layout === "horizontallayout"
                ? "xl:!mx-50 lg:!mx-50 md:mx-10 shadow-xl rounded-md bg-white"
                : "w-[80%]"
            )}
          >
            <h1 className=" font-semibold text-[20px] text-start !mb-5 text-[#5081B9] uppercase border-b border-gray-300 !pb-5">
              {currentSection?.status}
            </h1>
            <div className=" text-start">
              <div
                className="custom-grid"
                style={{
                  gridTemplateColumns: `repeat(${
                    currentItem?.colGrid ?? 3
                  }, 1fr)`,
                  columnGap: `${currentItem?.gapCol ?? 20}px`,
                  rowGap: `${currentItem?.gapRow ?? 40}px`,
                }}
              >
                {currentSection?.displayField?.map((displaylist: any) => {
                  return (
                    <CustomField
                      key={displaylist.key}
                      names={displaylist.key}
                      label={displaylist.label}
                      type={displaylist.subType}
                      isSearchable={displaylist?.isSearchable}
                      placeHoldercolor={displaylist?.placeHoldercolor}
                      placeHolderSize={displaylist?.placeHolderSize}
                      focusErrorBgColor={currentSection.focusErrorBgColor}
                      focusErrorBorderColor={
                        currentSection.focusErrorBorderColor
                      }
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
                    className="bg-[#5081B9] text-white !px-4 !py-2 rounded"
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
                    className="bg-[#5081B9] text-white !px-4 !py-2 rounded"
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
  );
};

export default StepForm;
