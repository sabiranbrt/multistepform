import clsx from "clsx";
import { useState } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface IProps {
  option: Option[];
  textClassName?: string;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  focusBorderColor?: string;
  placeHolder?: string;
  focusErrorBorderColor?: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  focusErrorBgColor?: string;
  focusErrorShadowColor?: string;
  focusShadowColor?: string;
}

const CustomMultiSelect = ({
  option,
  textClassName,
  focusBorderColor,
  placeHolder,
  setIsFocused,
  focusErrorBorderColor,
  focusErrorShadowColor,
  isFocused,
  focusErrorBgColor,
  focusShadowColor,
  error,
}: IProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleSelect = (option: Option) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemove = (value: string) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option.value !== value)
    );
  };
  console.log("isFocused", isFocused);

  return (
    <div>
      <div
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={toggleDropdown}
        className={clsx(
          "outline-0 flex flex-wrap gap-1",
          textClassName
            ? textClassName
            : "bg-[#F7F7F7] !px-2 !py-3 rounded-sm border border-[#F2F2F2]"
        )}
        style={{
          borderColor: error
            ? focusErrorBorderColor
            : isFocused
            ? focusBorderColor ?? "#5081B9"
            : "#F2F2F2",
          backgroundColor: error
            ? focusErrorBgColor ?? "#FFF2F2"
            : !isFocused
            ? "#F7F7F7"
            : undefined,
          boxShadow: error
            ? `0 1px 2px 0 ${focusErrorShadowColor}`
            : isFocused
            ? `0 1px 2px 0 ${focusShadowColor}`
            : undefined,
        }}
      >
        {selectedOptions.length === 0 ? (
          <span style={{ color: "#aaa" }}>{placeHolder}</span>
        ) : (
          selectedOptions.map((option) => (
            <span
              key={option.value}
              style={{
                backgroundColor: "#e2e8f0",
                padding: "2px 6px",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
              }}
            >
              {option.label}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                style={{
                  marginLeft: 6,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </span>
            </span>
          ))
        )}
      </div>

      {isDropdownOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            marginTop: 4,
            position: "absolute",
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 10,
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          {option.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                padding: 8,
                cursor: "pointer",
                backgroundColor: selectedOptions.find(
                  (o) => o.value === option.value
                )
                  ? "#edf2f7"
                  : "#fff",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
