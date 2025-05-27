
export enum ResponseType {
  SUCCESS = "success",
  ERROR = "error",
}

export type Response<T> = {
  message: string
  type: ResponseType
  response?: T
}

export enum FieldTypes {
  TEXTFIELD = "text",
  SELECTFIELD = "dropdown",
  TEXTAREA = "area",
  CHECKBOX = 'checkbox',
  RADIOBUTTON = "radio",
  PASSFIELD = 'password',
  FILE = "file",
  CUSTOMPASS = "custompass",
  MULTISELECT = "multiSelect",
  PREVIEW = "preview"
};

export interface ValidationProps {
  required?: string;
  validations: Validations[]
}
export interface Validations{
  regex: string
  errorMessage?: string;
}

export interface FormValues {
  firstName: string
  middleName: string
  lastName: string
  email: string
  dob: string
  citizenshipNumber: string
  mobileNumber: string
  imagePreview: string
  Gender: string
  designation: string
  multiSelect: string
  uploadPhoto: string
  country: string
  province: string
  district: string
  postalCode: string
  city: string
}

