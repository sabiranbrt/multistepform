import clsx from "clsx";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFileImage } from "react-icons/fa";
import Select from "react-select";
import { FieldTypes, type ValidationProps } from "../../types";
import { ValidationRules } from "../../utils/ValidationRegister";
import Label from "../label";

interface Options {
  label: string;
  value: string;
}

interface IProps {
  names: string;
  value?: string;
  ValidClassName?: string;
  isSearchable?: boolean;
  readOnly?: boolean;
  type?: string;
  placeHolder?: string;
  focusBorderColor?: string;
  focusShadowColor?: string;
  focusErrorBorderColor?: string;
  focusErrorBgColor?: string;
  focusErrorShadowColor?: string;
  label: string;
  inputHeight?: string;
  inputWidth?: string;
  disabled?: boolean;
  onChange?: (text: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeArea?: (text: React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelClassName?: string;
  nonlabelClassName?: string;
  textClassName?: string;
  fieldType: string;
  options?: Options[];
  validation?: ValidationProps;
  textSecurity?: string;
}

const CustomField = ({
  names,
  inputHeight = "3",
  inputWidth = "2",
  placeHolder,
  ValidClassName,
  isSearchable,
  readOnly,
  label,
  focusErrorBorderColor = "#f94d44",
  validation,
  onChange,
  labelClassName,
  nonlabelClassName,
  focusBorderColor,
  focusShadowColor = "#F2F2F2",
  focusErrorBgColor,
  focusErrorShadowColor = "#F2F2F2",
  disabled,
  textClassName,
  type,
  fieldType,
  textSecurity = "&",
  onChangeArea,
  options = [],
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const generatedRules = ValidationRules(validation);
  const [isFocused, setIsFocused] = useState(false);
  const [tooglePassword, setTogglePassword] = useState(false);
  const [realValue, setRealValue] = useState("");
  const [selectFile, setSelectedFile] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const showFloatingLabel =
    fieldType !== FieldTypes.RADIOBUTTON &&
    fieldType !== FieldTypes.CHECKBOX &&
    fieldType !== FieldTypes.FILE;

  const inputType =
    type === "password" ? (tooglePassword ? "password" : "text") : type;

  const customStyles = {
    control: (provided: any, state: any) => {
      const hasError = errors && errors[names];

      return {
        ...provided,
        borderColor: hasError
          ? focusErrorBorderColor
          : state.isFocused
          ? focusBorderColor ?? "#5081B9"
          : "#F2F2F2",
        backgroundColor: hasError
          ? focusErrorBgColor ?? "#FFF2F2"
          : !state.isFocused
          ? "#F7F7F7"
          : provided.backgroundColor,
        boxShadow: hasError
          ? `0 1px 2px 0 ${focusErrorShadowColor}`
          : state.isFocused
          ? `0 1px 2px 0 ${focusShadowColor}`
          : undefined,
        padding: `${inputHeight}px ${inputWidth}px !important`,
        borderRadius: 4,
        margin: "0 !important",
      };
    },
  };

  return (
    <div>
      <Controller
        control={control}
        name={names}
        rules={{ ...generatedRules }}
        render={({ field }) => {
          return (
            <div className=" text-start" {...field}>
              <div className={clsx("relative")}>
                {showFloatingLabel && (isFocused || field.value) && (
                  <label
                    htmlFor={label}
                    className={clsx("absolute -top-2.5 left-2 z-10")}
                  >
                    <Label
                      label={label}
                      labelClassName={labelClassName ?? ""}
                    />
                  </label>
                )}
                {fieldType === FieldTypes?.CHECKBOX ||
                fieldType === FieldTypes?.RADIOBUTTON ||
                fieldType === FieldTypes?.FILE ? (
                  <div className={clsx(" !mb-3")}>
                    <Label
                      label={label ?? ""}
                      labelClassName={
                        nonlabelClassName ?? "text-gray-500 font-bold"
                      }
                    />
                  </div>
                ) : null}
                {fieldType === FieldTypes?.TEXTFIELD ? (
                  <input
                    className={clsx(
                      `outline-0 !py-${inputHeight} !px-${inputWidth}`,
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] rounded-sm border border-[#F2F2F2]"
                    )}
                    style={{
                      borderColor: errors[names]
                        ? focusErrorBorderColor
                        : isFocused
                        ? focusBorderColor ?? "#5081B9"
                        : "#F2F2F2",
                      backgroundColor: errors[names]
                        ? focusErrorBgColor ?? "#FFF2F2"
                        : !isFocused
                        ? "#F7F7F7"
                        : undefined,
                      boxShadow: errors[names]
                        ? `0 1px 2px 0 ${focusErrorShadowColor}`
                        : isFocused
                        ? `0 1px 2px 0 ${focusShadowColor}`
                        : undefined,
                    }}
                    placeholder={!isFocused ? placeHolder : ""}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={field.value ? readOnly : false}
                    type={type}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      if (onChange) onChange(e);
                    }}
                  />
                ) : fieldType === FieldTypes?.SELECTFIELD ? (
                  <select
                    defaultValue={placeHolder}
                    className={clsx(
                      `outline-0 !py-${inputHeight} !px-${inputWidth}`,
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
                    )}
                    style={{
                      borderColor: errors[names]
                        ? focusErrorBorderColor
                        : isFocused
                        ? focusBorderColor ?? "#5081B9"
                        : "#F2F2F2",
                      backgroundColor: errors[names]
                        ? focusErrorBgColor ?? "#FFF2F2"
                        : !isFocused
                        ? "#F7F7F7"
                        : undefined,
                      boxShadow: errors[names]
                        ? `0 1px 2px 0 ${focusErrorShadowColor}`
                        : isFocused
                        ? `0 1px 2px 0 ${focusShadowColor}`
                        : undefined,
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={field.value ? readOnly : false}
                  >
                    <option disabled>{placeHolder}</option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : fieldType === FieldTypes?.TEXTAREA ? (
                  <textarea
                    disabled={field.value ? readOnly : false}
                    className={clsx(
                      `outline-0 !py-${inputHeight} !px-${inputWidth}`,
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
                    )}
                    style={{
                      borderColor: errors[names]
                        ? focusErrorBorderColor
                        : isFocused
                        ? focusBorderColor ?? "#5081B9"
                        : "#F2F2F2",
                      backgroundColor: errors[names]
                        ? focusErrorBgColor ?? "#FFF2F2"
                        : !isFocused
                        ? "#F7F7F7"
                        : undefined,
                      boxShadow: errors[names]
                        ? `0 1px 2px 0 ${focusErrorShadowColor}`
                        : isFocused
                        ? `0 1px 2px 0 ${focusShadowColor}`
                        : undefined,
                    }}
                    placeholder={!isFocused ? placeHolder : ""}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      if (onChangeArea) onChangeArea(e);
                    }}
                  />
                ) : fieldType === FieldTypes?.CHECKBOX ? (
                  <div className=" flex flex-row flex-wrap gap-1.5">
                    {options?.map((opt) => (
                      <div
                        key={opt.value}
                        className=" flex flex-row items-center gap-2 flex-nowrap"
                      >
                        <input
                          className={clsx(
                            "whitespace-nowrap",
                            labelClassName ? labelClassName : " text-gray-500"
                          )}
                          disabled={field.value ? readOnly : false}
                          type="checkbox"
                          onSelect={field.value}
                          onChange={field.onChange}
                        />
                        <label
                          className={clsx(
                            "whitespace-nowrap",
                            labelClassName ? labelClassName : " text-gray-500"
                          )}
                        >
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : fieldType === FieldTypes?.RADIOBUTTON ? (
                  <div className=" flex flex-row flex-wrap gap-1.5">
                    {options?.map((opt) => (
                      <div
                        key={opt.value}
                        className=" flex flex-row items-center gap-2 flex-nowrap"
                      >
                        <input
                          disabled={field.value ? readOnly : false}
                          type="radio"
                          value={opt.value}
                          checked={
                            (field.value ?? options[0]?.value) === opt.value
                          }
                          onChange={() => field.onChange(opt.value)}
                        />
                        <label
                          className={clsx(
                            "whitespace-nowrap",
                            labelClassName ? labelClassName : " text-gray-500"
                          )}
                        >
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : fieldType === FieldTypes?.PASSFIELD ? (
                  <div className="relative">
                    <input
                      className={clsx(
                        `outline-0 !py-${inputHeight} !px-${inputWidth}`,
                        textClassName
                          ? textClassName
                          : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
                      )}
                      style={{
                        borderColor: errors[names]
                          ? focusErrorBorderColor
                          : isFocused
                          ? focusBorderColor ?? "#5081B9"
                          : "#F2F2F2",
                        backgroundColor: errors[names]
                          ? focusErrorBgColor ?? "#FFF2F2"
                          : !isFocused
                          ? "#F7F7F7"
                          : undefined,
                        boxShadow: errors[names]
                          ? `0 1px 2px 0 ${focusErrorShadowColor}`
                          : isFocused
                          ? `0 1px 2px 0 ${focusShadowColor}`
                          : undefined,
                      }}
                      placeholder={!isFocused ? placeHolder : ""}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={field.value ? readOnly : false}
                      type={inputType}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        if (onChange) onChange(e);
                      }}
                    />
                    {fieldType === FieldTypes?.PASSFIELD && (
                      <div
                        className="absolute top-3 right-3"
                        onClick={() => setTogglePassword(!tooglePassword)}
                      >
                        {tooglePassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    )}
                  </div>
                ) : fieldType === FieldTypes?.FILE ? (
                  <div
                    className={clsx(
                      "outline-0",
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
                    )}
                  >
                    <label
                      htmlFor="file-upload"
                      className=" flex flex-col items-center gap-1.5"
                    >
                      <FaFileImage className=" h-10 w-10" />
                      <p>Upload File</p>
                      <p>{selectFile}</p>
                    </label>
                    <input
                      id="file-upload"
                      style={{ display: "none" }}
                      className={clsx(
                        "outline-0",
                        textClassName
                          ? textClassName
                          : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]",
                        isFocused
                          ? "border !border-[#5081B9] shadow-sm shadow-[#F2F2F2]"
                          : focusBorderColor,
                        !focusErrorBorderColor
                          ? errors[names]
                            ? "border !border-[#f94d44] shadow-sm shadow-[#F2F2F2] bg-[#FFF2F2]"
                            : focusErrorBorderColor
                          : ""
                      )}
                      placeholder={!isFocused ? placeHolder : ""}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={field.value ? readOnly : false}
                      type={type ? type : "file"}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        setSelectedFile(value);
                        if (onChange) onChange(e);
                      }}
                    />
                  </div>
                ) : fieldType === FieldTypes?.CUSTOMPASS ? (
                  <div className="relative">
                    <input
                      className={clsx(
                        `outline-0 !py-${inputHeight} !px-${inputWidth}`,
                        textClassName
                          ? textClassName
                          : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
                      )}
                      style={{
                        borderColor: errors[names]
                          ? focusErrorBorderColor
                          : isFocused
                          ? focusBorderColor ?? "#5081B9"
                          : "#F2F2F2",
                        backgroundColor: errors[names]
                          ? focusErrorBgColor ?? "#FFF2F2"
                          : !isFocused
                          ? "#F7F7F7"
                          : undefined,
                        boxShadow: errors[names]
                          ? `0 1px 2px 0 ${focusErrorShadowColor}`
                          : isFocused
                          ? `0 1px 2px 0 ${focusShadowColor}`
                          : undefined,
                      }}
                      placeholder={!isFocused ? placeHolder : ""}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={
                        !tooglePassword
                          ? textSecurity.repeat(realValue.length)
                          : realValue
                      }
                      disabled={field.value ? readOnly : false}
                      type={inputType}
                      onChange={(e) => {
                        const input = e.target.value;
                        const prevLength = realValue.length;
                        const inputLength = input.length;

                        if (inputLength < prevLength) {
                          setRealValue(realValue.slice(0, inputLength));
                          field.onChange(realValue.slice(0, inputLength));
                        } else {
                          const addedChar = input[input.length - 1];
                          const newValue = realValue + addedChar;
                          setRealValue(newValue);
                          field.onChange(newValue);
                        }

                        if (onChange) onChange(e);
                      }}
                    />
                    {fieldType === FieldTypes?.CUSTOMPASS && (
                      <div
                        className="absolute top-3 right-3"
                        onClick={() => setTogglePassword(!tooglePassword)}
                      >
                        {tooglePassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    )}
                  </div>
                ) : fieldType === FieldTypes?.MULTISELECT ? (
                  <Select
                    isDisabled={field.value ? readOnly : false}
                    isSearchable={isSearchable}
                    placeholder={placeHolder}
                    styles={customStyles}
                    isMulti
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    options={options}
                  />
                ) : null}
              </div>
              {errors[names] && (
                <div
                  className={clsx(
                    "!mt-0.5",
                    ValidClassName
                      ? ValidClassName
                      : "text-[10px] text-[#f94d44]"
                  )}
                >
                  <p>{errors[names]?.message as string}</p>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomField;
