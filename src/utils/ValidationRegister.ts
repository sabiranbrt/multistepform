import { type RegisterOptions } from "react-hook-form";
import type { ValidationProps } from "../types";

export const ValidationRules = (validation?: ValidationProps): RegisterOptions => {
  const rules: RegisterOptions = {};

  if (!validation) return rules;

  if (validation.required === "Y") {
    rules.required = "This field is required";
  }

  if (validation.validations) {
    validation.validations.forEach((val) => {
      if (val.regex) {
        try {
          const regex = new RegExp(val.regex);
          rules.pattern = {
            value: regex,
            message: val.errorMessage || "Invalid format",
          };
        } catch (err) {
          console.warn("Invalid regex pattern:", err);
        }
      }
    });
  } 

  return rules;
};