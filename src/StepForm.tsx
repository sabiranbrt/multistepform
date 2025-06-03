/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ArrowLeft from "./assets/icons/arrowLeft.svg";
import ArrowRight from "./assets/icons/arrowRight.svg";
import { default as CustomField } from "./components/CustomField";
import Modal from "./components/Modal";
import LeftDetails from "./components/Modal/LeftDetails";
import MultiFormHeader from "./components/multiFormHeader";
import Spinner from "./components/spinner";
import { useFormList, useSaveForm } from "./hooks";
import { updateLoading } from "./redux/slices/appSlice";
import type { FormValues } from "./types";
import agent from "./utils/agent.json";
import slabData from "./utils/slab.json";

const StepForm = () => {
  const { note, slabDetails } = slabData;
  // leftDetails
  const { panCardData, userPersonalDetails, accounts } = agent;
  console.log("panCardData", panCardData);
  console.log("userPersonalDetails", userPersonalDetails);
  console.log("accounts", accounts);

  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { data: formList, isLoading } = useFormList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync } = useSaveForm();

  const methods = useForm<FormValues>({
    mode: "onChange",
  });

  const { handleSubmit, trigger, setValue } = methods;

  const mobileNumber = "9842143869";

  const onSubmitForData = () => {
    setValue("mobileNumber", mobileNumber);
  };

  const onSubmit = async (formValues: FormValues) => {
    localStorage.setItem("dynamicMethod", formList?.dynamicMethod);
    dispatch(updateLoading({ isLoading: true }));
    try {
      const response = await mutateAsync({ ...formValues });
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
          validation={displaylist?.validation}
          onChangeImage={() => {}} // for image formData change
          onClick={onSubmitForData} // for action fetch button auto fill option if available show or not
          ActionFetch={displaylist?.ActionFetch} // autofetch button show or hide according to api request data
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

  const getCurrentStepFieldNames = (): any[] => {
    const stepKeys = Object.keys(formList?.dataFields ?? {}) as Array<
      keyof typeof formList.dataFields
    >;
    const currentKey = stepKeys[index];
    const currentStep = formList?.dataFields?.[currentKey];

    if (!Array.isArray(currentStep)) {
      return currentStep?.displayField?.map((item: any) => item.key) ?? [];
    }

    return [];
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="">
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
                          const fieldsToValidate = getCurrentStepFieldNames();
                          const isStepValid = await trigger(fieldsToValidate);
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
        <button
          type="submit"
          className="bg-[#5081B9] hover:bg-[#000769] transition-[2000] text-white !px-4 !py-2 rounded cursor-pointer"
          title="Submit Now"
          onClick={() => setIsModalOpen(true)}
        >
          OpenModal
        </button>
        {isModalOpen && (
          <Modal handleCancel={() => setIsModalOpen(false)}>
            <div className="p-1 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-800 items-center gap-3 ml-4 mr-4">
                {note}
                {/* {transType === "CC" || transType === "FW"
                      ? selectedOption
                      : transType === "EP"
                      ? isRP
                        ? "Rent Payment"
                        : "Fund Settlement"
                      : "Education Fees"}
                    {transType === "EP" ||
                    transType === "CC" ||
                    transType === "FW" ? (
                      <div className="text-base text-primary flex justify-center text-left flex-nowrap">
                        {note}
                      </div>
                    ) : (
                      <div className="flex flex-nowrap items-center justify-end mt-2 w-full space-x-4 relative group">
                        <div className="text-base text-primary w-full">
                          {note}
                        </div>
                        <div className="flex flex-nowrap items-center justify-end mt-2 w-full space-x-4 relative group">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="payment"
                              value="credit"
                              checked={selectedPayment === "credit"}
                              onChange={handleChangeRadio}
                            />

                            <span className="text-gray-600 text-sm">
                              Credit Card
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="payment"
                              value="master"
                              checked={selectedPayment === "master"}
                              onChange={handleChangeRadio}
                            />
                            <span className="text-gray-600 text-sm">
                              Master Card
                            </span>
                          </label>
                          <label className="flex items-center space-x-2 relative group/others">
                            <input
                              type="radio"
                              name="payment"
                              value="other"
                              checked={selectedPayment === "other"}
                              onChange={handleChangeRadio}
                              disabled
                            />
                            <span className="text-gray-600 text-sm">
                              Corporate Card
                            </span>
                            <span className="absolute hidden group-hover/others:block p-1 rounded-md top-5 -right-3 text-xs w-36 text-center bg-gray-600 text-white">
                              Service Not Available
                            </span>
                          </label>
                        </div>
                      </div>
                    )} */}
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Section - Details */}
              <LeftDetails
                slabDetails={slabDetails}
                panCardData={panCardData}
              />
              {/* Right Section - Transfer Form */}
              {/* <RightForm /> */}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default StepForm;
