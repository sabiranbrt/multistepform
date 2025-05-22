
export const FieldTypes = {
  TEXTFIELD: "text",
  SELECTFIELD: "dropdown",
  TEXTAREA: "area",
  CHECKBOX: 'checkbox',
  RADIOBUTTON: "radio",
  PASSFIELD: 'password',
  FILE: "file",
  CUSTOMPASS: "custompass",
  MULTISELECT: "multiSelect",
  PREVIEW: "preview"
} as const;

type FieldTypes = keyof typeof FieldTypes;

export interface ValidationProps {
  required?: string;
  pattern?: string;
  errorMessage?: string;
}

