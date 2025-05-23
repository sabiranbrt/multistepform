import clsx from "clsx";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ArrowLeft from "./assets/icons/arrowLeft.svg";
import ArrowRight from "./assets/icons/arrowRight.svg";
import { default as CustomField } from "./components/CustomField";
import MultiFormHeader from "./components/multiFormHeader";
import Spinner from "./components/spinner";
import { useFormList, useSaveForm } from "./hooks";
import { updateLoading } from "./redux/slices/appSlice";
import type { FormValues } from "./types";

const StepForm = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { data: formList, isLoading } = useFormList();

  const { mutateAsync } = useSaveForm();

  const methods = useForm<FormValues>({
    mode: "onChange",
  });

  const { handleSubmit, trigger, reset } = methods;

  const onSubmit = async (formValues: FormValues) => {
    dispatch(updateLoading({ isLoading: true }));
    try {
      const response = await mutateAsync({ ...formValues });
      reset();
      console.log("response", response);
    } catch (err) {
      console.log("error", err);
    }
  };

  const render = () => {
    const stepKeys = Object.keys(formList?.dataFields) as Array<
      keyof typeof formList.dataFields
    >;
    const currentKey = stepKeys[index];
    const currentStep = formList.dataFields[currentKey];

    if (!Array.isArray(currentStep)) {
      return currentStep?.displayField?.map((displaylist: any) => (
        <CustomField
          key={displaylist?.key ?? ""}
          names={displaylist?.key ?? ""}
          label={displaylist.label}
          type={displaylist.subType}
          isSearchable={displaylist?.isSearchable}
          OptionFocusColor={displaylist?.OptionFocusColor}
          OptionTextColor={displaylist?.OptionTextColor}
          OptionSelectFocusColor={displaylist?.OptionSelectFocusColor}
          OptionSelectColor={displaylist?.OptionSelectColor}
          imageLink={displaylist?.imageLink}
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
    const stepKeys = Object.keys(formList.dataFields) as Array<
      keyof typeof formList.dataFields
    >;
    const currentKey = stepKeys[index];
    const currentStep = formList.dataFields[currentKey];

    if (!Array.isArray(currentStep)) {
      return (
        <h1
          className={clsx(
            " font-semibold text-[20px] !mb-5 text-[#5081B9] uppercase border-b border-gray-300 !pb-5",
            formList.formTitle === "center"
              ? "text-center"
              : formList.formTitle === "end" && "text-end"
          )}
        >
          {currentStep?.status}
        </h1>
      );
    }

    return null;
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className=" h-dvh">
        <FormProvider {...methods}>
          <div
            className={clsx(
              " h-full flex-row gap-8",
              formList?.layout === "horizontallayout" ? "bg-[#F2F2F2]" : "flex"
            )}
          >
            <div
              className={clsx(
                " relative rounded-md",
                formList?.layout === "horizontallayout"
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
              {formList?.formType === "multiple" && (
                <div>
                  <MultiFormHeader currentIndex={index} formList={formList} />
                </div>
              )}
            </div>

            <div
              className={clsx(
                " relative flex flex-col gap-5 !px-8 !py-10",
                formList?.layout === "horizontallayout"
                  ? "!mx-10 shadow-xl rounded-md bg-white"
                  : "w-[80%]"
              )}
            >
              <div className=" text-start">
                {statusName()}
                <div
                  className="custom-grid"
                  style={{
                    gridTemplateColumns: `repeat(${
                      formList?.colGrid ?? 3
                    }, 1fr)`,
                    columnGap: `${formList?.gapCol ?? 20}px`,
                    rowGap: `${formList?.gapRow ?? 40}px`,
                  }}
                >
                  {render()}
                </div>
                <div className="flex items-center justify-end gap-5 !mt-10">
                  {index > 0 && formList?.formType === "multiple" && (
                    <div
                      onClick={() => {
                        setIndex((prev) => prev - 1);
                      }}
                      className=" flex flex-row items-center gap-2 bg-[#5081B9] hover:bg-[#000769] transition-[2000] text-white !px-4 !py-2 rounded cursor-pointer"
                    >
                      <img src={ArrowLeft} className="w-4 h-4" />
                      <p className="">Previous</p>
                    </div>
                  )}
                  {index < Object.keys(formList?.dataFields).length - 1 ? (
                    formList?.formType === "multiple" && (
                      <div
                        onClick={async () => {
                          const isStepValid = await trigger();
                          if (isStepValid) {
                            setIndex((prev) => prev + 1);
                          }
                        }}
                        className=" flex flex-row items-center gap-2 bg-[#5081B9] hover:bg-[#000769] transition-[2000] text-white !px-4 !py-2 rounded cursor-pointer"
                      >
                        <p className="">Next</p>
                        <img src={ArrowRight} className="w-4 h-4" />
                      </div>
                    )
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#5081B9] hover:bg-[#000769] transition-[2000] text-white !px-4 !py-2 rounded cursor-pointer"
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
    </>
  );
};

export default StepForm;
