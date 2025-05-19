export const JsonFormat = [
    {
        "layout": "horizontallayout",
        "colGrid": "3",
        "gapCol": "40",
        "gapRow": "20",
        "section": [
            {
                "status": "Additional Information",
                "displayRemarks": "Please provide additional details",
                "errorColor": "#ff4d4f",
                "focusErrorBgColor": "#DCFFDB",
                "nos": "1",
                "displayField": [
                    {
                        "key": "firstName",
                        "label": "First Name",
                        "placeholder": "Enter First Name",
                        "isSearchable": true,
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "lastname",
                        "label": "Last Name",
                        "placeholder": "Enter Last Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "password",
                        "label": "Password",
                        "placeholder": "Enter Password",
                        "fieldType": "custompass",
                        "textSecurity": "$",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "mobilenumber",
                        "label": "Mobile Number",
                        "placeholder": "Enter Mobile Number",
                        "fieldType": "text",
                        "subType": "number",
                        "validation": {
                            "required": "N",
                            "pattern": "^[6-9]\\d{9}$",
                            "errorMessage": "Enter a valid 10-digit mobile number starting with 6-9."
                        }
                    },
                    {
                        "key": "alternate_addressline1",
                        "label": "Addressline1",
                        "placeholder": "Enter Address Line 1",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Address Line 1 must be between 5 and 100 characters."
                        }
                    },
                    {
                        "key": "Gender",
                        "label": "Designation",
                        "placeholder": "Select Gender",
                        "fieldType": "radio",
                        "nonInputLabel": "Choose Gender",
                        "dropdownOptions": [
                            { "label": "Male", "value": "Male" },
                            { "label": "Female", "value": "Female" },
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "relations",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "checkbox",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "fieldType": "dropdown",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "multiselect",
                        "label": "Multi Select",
                        "placeholder": "Select Multiple",
                        "fieldType": "multiSelect",
                        "isSearchable": true,
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "Upload Photo",
                        "label": "Photo",
                        "placeholder": "Upload Photo",
                        "fieldType": "file",
                        "nonInputLabel": "Choose Gender",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    }
                ]
            },
            {
                "status": "Additional Information",
                "displayRemarks": "Please provide additional details",
                "errorColor": "#ff4d4f",
                "nos": "2",
                "displayField": [
                    {
                        "key": "firstName",
                        "label": "First Name",
                        "placeholder": "Enter First Name",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "lastname",
                        "label": "Last Name",
                        "placeholder": "Enter Last Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "mobilenumber",
                        "label": "Mobile Number",
                        "placeholder": "Enter Mobile Number",
                        "fieldType": "text",
                        "subType": "number",
                        "validation": {
                            "required": "N",
                            "pattern": "^[6-9]\\d{9}$",
                            "errorMessage": "Enter a valid 10-digit mobile number starting with 6-9."
                        }
                    },
                    {
                        "key": "alternate_addressline1",
                        "label": "Addressline1",
                        "placeholder": "Enter Address Line 1",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Address Line 1 must be between 5 and 100 characters."
                        }
                    },
                    {
                        "key": "Gender",
                        "label": "Designation",
                        "placeholder": "Select Gender",
                        "fieldType": "radio",
                        "nonInputLabel": "Choose Gender",
                        "dropdownOptions": [
                            { "label": "Male", "value": "Male" },
                            { "label": "Female", "value": "Female" },
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "checkbox",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "fieldType": "dropdown",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    }
                ]
            },
            {
                "status": "Information",
                "displayRemarks": "Please provide additional details",
                "errorColor": "#ff4d4f",
                "nos": "3",
                "displayField": [
                    {
                        "key": "firstName",
                        "label": "First Name",
                        "placeholder": "Enter First Name",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "lastname",
                        "label": "Last Name",
                        "placeholder": "Enter Last Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "mobilenumber",
                        "label": "Mobile Number",
                        "placeholder": "Enter Mobile Number",
                        "fieldType": "text",
                        "subType": "number",
                        "validation": {
                            "required": "N",
                            "pattern": "^[6-9]\\d{9}$",
                            "errorMessage": "Enter a valid 10-digit mobile number starting with 6-9."
                        }
                    },
                    {
                        "key": "alternate_addressline1",
                        "label": "Addressline1",
                        "placeholder": "Enter Address Line 1",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Address Line 1 must be between 5 and 100 characters."
                        }
                    },
                    {
                        "key": "Gender",
                        "label": "Designation",
                        "placeholder": "Select Gender",
                        "fieldType": "radio",
                        "nonInputLabel": "Choose Gender",
                        "dropdownOptions": [
                            { "label": "Male", "value": "Male" },
                            { "label": "Female", "value": "Female" },
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "checkbox",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "fieldType": "dropdown",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    }
                ]
            },
            {
                "status": "Additional",
                "displayRemarks": "Please provide additional details",
                "errorColor": "#ff4d4f",
                "nos": "4",
                "displayField": [
                    {
                        "key": "firstName",
                        "label": "First Name",
                        "placeholder": "Enter First Name",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "lastname",
                        "label": "Last Name",
                        "placeholder": "Enter Last Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "mobilenumber",
                        "label": "Mobile Number",
                        "placeholder": "Enter Mobile Number",
                        "fieldType": "text",
                        "subType": "number",
                        "validation": {
                            "required": "N",
                            "pattern": "^[6-9]\\d{9}$",
                            "errorMessage": "Enter a valid 10-digit mobile number starting with 6-9."
                        }
                    },
                    {
                        "key": "alternate_addressline1",
                        "label": "Addressline1",
                        "placeholder": "Enter Address Line 1",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Address Line 1 must be between 5 and 100 characters."
                        }
                    },
                    {
                        "key": "Gender",
                        "label": "Designation",
                        "placeholder": "Select Gender",
                        "fieldType": "radio",
                        "nonInputLabel": "Choose Gender",
                        "dropdownOptions": [
                            { "label": "Male", "value": "Male" },
                            { "label": "Female", "value": "Female" },
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "nonInputLabel": "NoN Input Label",
                        "fieldType": "checkbox",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                    {
                        "key": "designation",
                        "label": "Designation",
                        "placeholder": "Select Designation",
                        "fieldType": "dropdown",
                        "dropdownOptions": [
                            { "label": "Spouse", "value": "1" },
                            { "label": "Sibling", "value": "2" },
                            { "label": "Parent or Guardian", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    }
                ]
            },
        ]
    }
]