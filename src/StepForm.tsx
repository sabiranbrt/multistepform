import clsx from "clsx";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { default as CustomField } from "./components/CustomField";
import MultiFormHeader from "./components/multiFormHeader";
import data from "./utils/structure.json";

const StepForm = () => {
  const [index, setIndex] = useState(0);
  const json = data;

  const methods = useForm<any>({
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = () => {
    console.log("SUBMITTED");
  };

  const render = () => {
    const stepKeys = Object.keys(json.dataFields) as Array<
      keyof typeof json.dataFields
    >;
    const currentKey = stepKeys[index];
    const currentStep = json.dataFields[currentKey];

    if (!Array.isArray(currentStep)) {
      return currentStep?.displayField?.map((displaylist: any) => (
        <CustomField
          key={displaylist.key}
          names={displaylist.key}
          label={displaylist.label}
          type={displaylist.subType}
          isSearchable={displaylist?.isSearchable}
          OptionFocusColor={displaylist?.OptionFocusColor}
          OptionTextColor={displaylist?.OptionTextColor}
          OptionSelectFocusColor={displaylist?.OptionSelectFocusColor}
          OptionSelectColor={displaylist?.OptionSelectColor}
          placeHoldercolor={displaylist?.placeHoldercolor}
          placeHolderSize={displaylist?.placeHolderSize}
          focusErrorBgColor={displaylist?.focusErrorBgColor}
          focusErrorBorderColor={displaylist?.focusErrorBorderColor}
          placeHolder={displaylist?.placeholder}
          fieldType={displaylist?.fieldType}
          options={displaylist?.dropdownOptions}
          validation={{
            required: displaylist?.validation.required,
            pattern: displaylist?.validation.pattern,
            errorMessage: displaylist?.validation.errorMessage,
          }}
        />
      ));
    }

    return null;
  };

  const statusName = () => {
    const stepKeys = Object.keys(json.dataFields) as Array<
      keyof typeof json.dataFields
    >;
    const currentKey = stepKeys[index];
    const currentStep = json.dataFields[currentKey];

    if (!Array.isArray(currentStep)) {
      return (
        <h1
          className={clsx(
            " font-semibold text-[20px] !mb-5 text-[#5081B9] uppercase border-b border-gray-300 !pb-5",
            json.formTitle === "center"
              ? "text-center"
              : json.formTitle === "end" && "text-end"
          )}
        >
          {currentStep?.status}
        </h1>
      );
    }

    return null;
  };

  return (
    <div className=" h-dvh">
      <FormProvider {...methods}>
        <div
          className={clsx(
            " h-full flex-row gap-8",
            json?.layout === "horizontallayout" ? "bg-[#F2F2F2]" : "flex"
          )}
        >
          <div
            className={clsx(
              " relative rounded-md",
              json?.layout === "horizontallayout"
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

            <div>
              <MultiFormHeader currentIndex={index} />
            </div>
          </div>

          <div
            className={clsx(
              " relative flex flex-col gap-5 !px-8 !py-10",
              json?.layout === "horizontallayout"
                ? "xl:!mx-50 lg:!mx-50 md:mx-10 shadow-xl rounded-md bg-white"
                : "w-[80%]"
            )}
          >
            <div className=" text-start">
              {statusName()}
              <div
                className="custom-grid"
                style={{
                  gridTemplateColumns: `repeat(${json?.colGrid ?? 3}, 1fr)`,
                  columnGap: `${json?.gapCol ?? 20}px`,
                  rowGap: `${json?.gapRow ?? 40}px`,
                }}
              >
                {render()}
              </div>
              <div className="flex items-center gap-5 !mt-10">
                {index > 0 && Object.keys(json?.dataFields).length !== 1 && (
                  <button
                    type="button"
                    className="bg-[#5081B9] text-white !px-4 !py-2 rounded"
                    onClick={() => setIndex((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                )}
                {index < Object.keys(json?.dataFields).length - 1 ? (
                  Object.keys(json?.dataFields).length !== 1 && (
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
                  )
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
