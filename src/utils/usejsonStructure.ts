export const JsonFormat = [
    {
        "layout": "horizontallayout",
        "colGrid": "3",
        "gapCol": "40",
        "gapRow": "20",
        "section": [
            {
                "status": "Personal Information",
                "displayRemarks": "Please provide personal information",
                "nos": "1",
                "displayField": [
                    {
                        "key": "fullname",
                        "label": "Full Name",
                        "placeholder": "Enter your full name",
                        "fieldType": "text",
                        "focusErrorBorderColor": "#008000",
                        "errorColor": "#ff4d4f",
                        "focusErrorBgColor": "#DCFFDB",
                        "placeHoldercolor": "#000",
                        "readOnly": true,
                        "validation": {
                            "required": "Y",
                            "pattern": "^[A-Za-z]{2,50}$",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                    {
                        "key": "dob",
                        "label": "Date of Birth",
                        "placeholder": "YYYY-MM-DD",
                        "fieldType": "text",
                        "subType": "date",
                        "validation": {
                            "required": "Y",
                            "errorMessage": "Select date of birth"
                        }
                    },
                    {
                        "key": "citizenshipnumber",
                        "label": "Citizenship Number",
                        "placeholder": "Enter Citizenship Number",
                        "fieldType": "text",
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
                        "key": "profession",
                        "label": "Profession",
                        "placeholder": "Enter your profession",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Address Line 1 must be between 5 and 100 characters."
                        }
                    },
                    {
                        "key": "Gender",
                        "label": "Gender",
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
                        "label": "Realtion",
                        "placeholder": "Choose Relation",
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
                        "OptionFocusColor": "#fff",
                        "OptionTextColor": "#fff",
                        // "OptionSelectColor": "#000",
                        // "OptionSelectFocusColor": "#000",
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
                        "placeHoldercolor": "#000",
                        "placeHolderSize": "16",
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
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    }
                ]
            },
            {
                "status": "Temporary Address",
                "displayRemarks": "Please provide temporary address details",
                "errorColor": "#ff4d4f",
                "nos": "2",
                "displayField": [
                    {
                        "key": "country",
                        "label": "Country",
                        "placeholder": "Enter Country Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Must Enter county name"
                        }
                    },
                    {
                        "key": "province",
                        "label": "Province",
                        "placeholder": "Select Province",
                        "fieldType": "dropdown",
                        "dropdownOptions": [
                            { "label": "Province one", "value": "1" },
                            { "label": "Province two", "value": "2" },
                            { "label": "Bagmati", "value": "3" },
                            { "label": "Others", "value": "4" }
                        ],
                        "validation": {
                            "required": "N",
                            "errorMessage": "Please select a valid relationship."
                        }
                    },
                ]
            },
            {
                "status": "Permanent Address",
                "displayRemarks": "Please provide permanenta address details",
                "errorColor": "#ff4d4f",
                "nos": "3",
                "displayField": [
                    {
                        "key": "street",
                        "label": "Street Name",
                        "placeholder": "Enter Stret Name",
                        "fieldType": "text",
                        "validation": {
                            "required": "N",
                            "errorMessage": "Name must be 2-50 characters and contain only letters and spaces."
                        }
                    },
                ]
            },
        ]
    }
]