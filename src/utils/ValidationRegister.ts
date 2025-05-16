import { type RegisterOptions } from "react-hook-form";
import type { ValidationProps } from "../types";

export const ValidationRules = (validation?: ValidationProps): RegisterOptions => {
  const rules: RegisterOptions = {};

  if (!validation) return rules;

  if (validation.required === "Y") {
    rules.required = validation.errorMessage || "This field is required";
  }

  if (validation.pattern) {
    try {
      const regex = new RegExp(validation.pattern);
      rules.pattern = {
        value: regex,
        message: validation.errorMessage || "Invalid format",
      };
    } catch (error) {
      console.warn("Invalid regex pattern:", validation.pattern);
    }
  }

  return rules;
};
