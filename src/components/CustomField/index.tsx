import clsx from "clsx";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Label from "../label";
import { FieldTypes, type ValidationProps } from "../../types";
import { ValidationRules } from "../../utils/ValidationRegister";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface Options {
  label: string;
  value: string;
}

interface IProps {
  names: string;
  value?: string;
  ValidClassName?: string;
  type?: string;
  placeHolder?: string;
  focusBorderColor?: string;
  focusErrorBorderColor?: string;
  label: string;
  nonInputLabel?: string;
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
  placeHolder,
  ValidClassName,
  label,
  focusErrorBorderColor,
  validation,
  onChange,
  labelClassName,
  nonInputLabel,
  nonlabelClassName,
  focusBorderColor,
  disabled,
  textClassName,
  type,
  fieldType,
  textSecurity = "",
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const showFloatingLabel =
    fieldType !== FieldTypes.RADIOBUTTON && fieldType !== FieldTypes.CHECKBOX;

  const inputType =
    type === "password" ? (tooglePassword ? "password" : "text") : type;

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
                    className={clsx("absolute -top-2.5 left-2")}
                  >
                    <Label
                      label={label}
                      labelClassName={labelClassName ?? ""}
                    />
                  </label>
                )}
                {fieldType === FieldTypes?.CHECKBOX ||
                fieldType === FieldTypes?.RADIOBUTTON ? (
                  <div className={clsx(" !mb-3")}>
                    <Label
                      label={nonInputLabel ?? ""}
                      labelClassName={
                        nonlabelClassName ?? "text-gray-500 font-bold"
                      }
                    />
                  </div>
                ) : null}

                {fieldType === FieldTypes?.TEXTFIELD ? (
                  <input
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
                    disabled={disabled}
                    type={type}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      if (onChange) onChange(e);
                    }}
                  />
                ) : fieldType === FieldTypes?.SELECTFIELD ? (
                  <select
                    className={clsx(
                      "outline-0",
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]",
                      isFocused
                        ? "border !border-[#5081B9] shadow-sm shadow-[#F2F2F2]"
                        : focusBorderColor
                    )}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option disabled selected>
                      {placeHolder}
                    </option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : fieldType === FieldTypes?.TEXTAREA ? (
                  <textarea
                    className={clsx(
                      "outline-0",
                      textClassName
                        ? textClassName
                        : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]",
                      isFocused
                        ? "border !border-[#5081B9] shadow-sm shadow-[#F2F2F2]"
                        : focusBorderColor
                    )}
                    placeholder={!isFocused ? placeHolder : ""}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
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
                          type="radio"
                          value={opt.value}
                          checked={field.value === opt.value}
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
                        "outline-0",
                        textClassName
                          ? textClassName
                          : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]",
                        isFocused
                          ? "border !border-[#5081B9] shadow-sm shadow-[#F2F2F2]"
                          : focusBorderColor
                      )}
                      placeholder={!isFocused ? placeHolder : ""}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={disabled}
                      type={inputType}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        setRealValue(textSecurity.repeat(value.length));
                        if (onChange) onChange(e);
                      }}
                    />

                    {fieldType === FieldTypes?.PASSFIELD && (
                      <div
                        className="absolute top-2 right-2"
                        onClick={() => setTogglePassword(!tooglePassword)}
                      >
                        {tooglePassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    )}
                  </div>
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
