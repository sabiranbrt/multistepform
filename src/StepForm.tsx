import { FormProvider, useForm } from "react-hook-form";
import { default as CustomField } from "./components/CustomField";
import { JsonFormat } from "./utils/usejsonStructure";
import MultiFormHeader from "./components/multiFormHeader";
import { useState } from "react";

const StepForm = () => {
  const [index, setIndex] = useState(0);

  const methods = useForm<any>();
  const { handleSubmit, trigger } = methods;

  const onSubmit = () => {
    console.log("SUBMITTED");
  };

  const currentItem = JsonFormat[index];

  return (
    <div className=" h-dvh bg-[#F2F2F2]">
      <div className=" container">
        <FormProvider {...methods}>
          <div className="flex flex-row gap-8 !pt-10">
            <div className=" w-[20%]">
              <MultiFormHeader currentIndex={index} />
            </div>
            <div className=" w-[80%] flex flex-col gap-5 bg-white shadow-sm !px-8 !py-5 rounded-sm">
              <div className=" text-start">
                <h1 className=" font-semibold text-[25px] text-start !mb-5 text-gray-500">
                  {currentItem.status}
                </h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${
                      currentItem.colGrid ? currentItem.colGrid : "2"
                    }, 1fr)`,
                    columnGap: `${
                      currentItem.gapCol ? currentItem.gapCol : "20"
                    }px`,
                    rowGap: `${
                      currentItem.gapRow ? currentItem.gapRow : "20"
                    }px`,
                  }}
                >
                  {currentItem.displayField.map((item) => {
                    return (
                      <CustomField
                        names={item.key}
                        label={item.label}
                        type={item.subType}
                        placeHolder={item.placeholder}
                        fieldType={item.fieldType}
                        options={item.dropdownOptions}
                        nonInputLabel={item.nonInputLabel}
                        validation={{
                          required: item.validation.required,
                          pattern: item.validation.pattern,
                          errorMessage: item.validation.errorMessage,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between !mt-5">
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
                      className="bg-blue-500 text-white !px-4 !py-2 rounded"
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
