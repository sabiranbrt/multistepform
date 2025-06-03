
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
  errorMessage?: string;
  validations: Validations[]
}
export interface Validations {
  regex: string
  errorMessage?: string;
}

// export interface FormValues {
//   firstName: string
//   middleName: string
//   lastName: string
//   email: string
//   dob: string
//   citizenshipNumber: string
//   mobileNumber: string
//   imagePreview: string
//   Gender: string
//   designation: string
//   multiSelect: string
//   uploadPhoto: string
//   relations: string
//   country: string
//   province: string
//   district: string
//   postalCode: string
//   city: string
// }

export interface FormValues {
  fullName: string,
  dob: string,
  citizenshipNumber: string,
  password: string,
  customPassword: string,
  mobileNumber: string,
  imagePreview: string,
  gender: string,
  relations: string[],
  multiSelect: string[],
  uploadPhoto: string,
  country: string,
  province: string,
  district: string,
  postalCode: string,
  city: string
}

export enum QuickLinksEnum {
  CreditCardBillPayment = "Credit Card Bill Payment",
  FundWithdrawal = "Fund Withdrawal",
  RentPayment = "Rent Payment",
  FundSettlement = "Fund Settlement",
  RegisterSender = "Register Sender",
  Transactions = "Transactions",
  TotalPayout = "Total Payout",
  AccountLedger = "Account Ledger",
  RelationshipManager = "Relationship Manager"
}
