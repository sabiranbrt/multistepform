import { FormProvider, useForm } from "react-hook-form";
import { default as CustomField } from "./components/CustomField";
import { JsonFormat } from "./utils/usejsonStructure";
import MultiFormHeader from "./components/multiFormHeader";
import { useState } from "react";

const StepForm = () => {
  const [index, setIndex] = useState(0);

  const methods = useForm<any>({
    mode: "onChange",
  });
  const { handleSubmit, trigger } = methods;

  const onSubmit = () => {
    console.log("SUBMITTED");
  };

  const currentItem = JsonFormat[index];

  console.log("JsonFormat", currentItem);

  return (
    <div className="">
      <div className=" !m-5">
        <FormProvider {...methods}>
          <div className="flex flex-row gap-8">
            <div className=" w-[20%] !p-10 bg-[#F7F7F7] rounded-md">
              <div className=" !mb-5">
                <p className=" text-[20px] font-semibold">Fill the form</p>
                <p className="text-[16px]">
                  Follow the steps to make submit form
                </p>
              </div>
              <MultiFormHeader currentIndex={index} />
            </div>
            <div className=" relative w-[80%] flex flex-col gap-5!px-8 !py-5">
              <div className=" text-start">
                <h1 className=" font-semibold text-[20px] text-start !mb-5 text-gray-500">
                  {currentItem.status}
                </h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${
                      currentItem.colGrid ? currentItem.colGrid : "3"
                    }, 1fr)`,
                    columnGap: `${
                      currentItem.gapCol ? currentItem.gapCol : "20"
                    }px`,
                    rowGap: `${
                      currentItem.gapRow ? currentItem.gapRow : "40"
                    }px`,
                  }}
                >
                  {currentItem?.displayField?.map((item) => {
                    return (
                      <CustomField
                        key={item.key}
                        names={item.key}
                        label={item.label}
                        type={item.subType}
                        // textSecurity={item.textSecurity}
                        focusErrorBgColor={currentItem.focusErrorBgColor}
                        placeHolder={item.placeholder}
                        fieldType={item.fieldType}
                        options={item.dropdownOptions}
                        validation={{
                          required: item.validation.required,
                          pattern: item.validation.pattern,
                          errorMessage: item.validation.errorMessage,
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
                  {index < JsonFormat.length - 1 ? (
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
