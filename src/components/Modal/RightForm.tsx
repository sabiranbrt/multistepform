const RightForm = () => {
  return (
    <div className="px-6 pb-6 bg-gray-50 lg:bg-white lg:border-l border-gray-100">
      {selectedOption === "Fund Withdrawal" && null}

      <div className="space-y-4 ">
        {/* Transfer Type */}
        <div
          className={`space-x-2 ${
            selectedOption === "Credit Card Bill Pay" ? "flex" : "hidden"
          }`}
        >
          <button
            type="button"
            className="flex-1 py-3  text-sm font-medium rounded-lg transition-all duration-200 bg-[#4b5a9f] text-white shadow-lg shadow-indigo-200"
          >
            {transferType}
          </button>
        </div>
        {selectedOption === "Fund Withdrawal" && (
          <div className="w-full flex flex-col gap-y-1 ">
            {/* <label className="text-sm font-medium text-gray-700 mb-3 block">
                                        Select Transfer Type
                                      </label> */}
            <div className="w-full flex gap-1">
              <button
                type="button"
                className={`px-3 py-2 ${
                  transferType === "IMPS"
                    ? "bg-[#4b5a9f] text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-all duration-200 flex-1 rounded-md`}
                onClick={() => {
                  handleTransferClick("IMPS");
                  resetFormData();
                }}
              >
                IMPS
              </button>
              <button
                type="button"
                className={`px-3 py-2  ${
                  transferType === "NEFT"
                    ? "bg-[#4b5a9f] text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-all duration-200 flex-1  rounded-md`}
                onClick={() => {
                  handleTransferClick("NEFT");
                  resetFormData();
                }}
              >
                NEFT
              </button>
            </div>
          </div>
        )}
        <div
          className="space-x-2"
          style={{
            display: activeForm === "expressPayment" ? "flex" : "none",
          }}
        >
          <button
            type="button"
            className="flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-200 bg-[#4b5a9f] text-white shadow-lg shadow-indigo-200"
            onClick={() => {
              handleOptionClick("Ik Credit Pay");
              setTransferType("Ik Credit Pay");
            }}
          >
            {isRP
              ? "Rent Payment"
              : transType === "EP"
              ? "Fund Settlement"
              : "Education Fees"}
          </button>
        </div>
        <div
          style={{
            display:
              activeForm === "expressPayment" ||
              activeForm === "creditCardBillPay" ||
              activeForm === "fundWithdrawal"
                ? "none"
                : "block",
          }}
        >
          {/* <label className="text-sm font-medium text-gray-700 mb-3 block">
                                      Select Transfer Type
                                    </label> */}

          <div className="flex space-x-2">
            {filteredServices.map((service) => (
              <button
                key={service}
                type="button"
                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selType === service
                    ? "bg-[#4b5a9f] text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => {
                  handleOptionClick(service);
                  setSelType(service);
                  setMarkupValue("");
                  setMarkupPercentage("");
                  setCharge("");
                  setChargeValue("");
                  formData.amount = "";
                  formData.charge = "";
                  formData.markup = "";
                }}
              >
                {/*  {formatIkTitle(service)} */}
                Education Fees
              </button>
            ))}
          </div>
        </div>
        {/* Amount Input */}

        <p className="text-sm text-blue-500">
          Request Amount must be between ₹{amountLimits?.minValue || 1} and ₹
          {amountLimits?.maxValue || 50000}
        </p>
        <div className="w-full flex justify-center gap-2">
          <div className="flex-2">
            <div className="w-full flex justify-center flex-col gap-y-0">
              <label className="text-sm font-medium text-gray-700 mb-3 text-center block">
                {/* {transType == "EP" ||
                                            transType == "CC" ||
                                            transType == "FW" ||
                                            transType == "RP" ? (
                                            <> Transaction Amount</>
                                          ) : (
                                            <> Request Amount</>
                                          )} */}
                Request Amount <span className="text-red-500">*</span>
              </label>

              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  tabIndex={1}
                  type="text"
                  className={`w-40 focus:outline-none pl-8 pr-4 py-3 bg-gray-100 border-2 ${
                    amountError ? "border-red-500" : "border-gray-100"
                  } rounded-lg focus:border-[#14192E] focus:ring-2 focus:ring-[#14192E]/20 transition-all duration-200`}
                  placeholder="0"
                  value={formData.amount}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "Home",
                      "End",
                    ];

                    if (
                      !/[0-9]/.test(e.key) &&
                      !allowedKeys.includes(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setMarkupError("");
                    let inputValue = e.target.value;
                    if (inputValue === "") {
                      setServiceFee("");
                      setCardLastSixDigits("");
                      setMarkupCharge("");
                      setFinalAmount("");
                      setRequestAmount("");
                    }

                    const parsedValue = parseFloat(inputValue);

                    // Dynamically get the min and max values for the current transType from the amountLimits
                    const limits = amountLimits || {
                      minValue: 1,
                      maxValue: 50000,
                    };
                    if (parsedValue > limits.maxValue) {
                      inputValue = `${limits.maxValue}`;
                      setAmountError(
                        `Request Amount must be between ₹${limits.minValue} and ₹${limits.maxValue}`
                      );
                      setTimeout(() => {
                        setAmountError("");
                      }, 2000);
                    } else if (parsedValue < limits.minValue) {
                      setAmountError(
                        `Request Amount must be between ₹${limits.minValue} and ₹${limits.maxValue}`
                      );
                    } else {
                      setAmountError("");
                    }
                    // Update the amount only if it is less than 7 characters
                    if (`${inputValue}`.length < 7) {
                      const value = parseFloat(inputValue);

                      handleInputChange(
                        "amount",
                        value,
                        selectedOption === "Ik Pay" ||
                          selectedOption === "Ik Credit Pay" ||
                          selectedOption === "Rent Payment"
                          ? creditCardType
                          : undefined
                      );

                      const vv = convertToWords(value);
                      setWord(vv);

                      setTransferAmount(inputValue);
                      setTotAm(inputValue);
                      setMarkupPercentage("");
                      setMarkupValue("");
                      setServiceFee("");
                      setCardLastSixDigits("");
                      setMarkupCharge("");
                      setFinalAmount("");
                      setRequestAmount("");
                    }

                    // Update the form data with the new value (whether capped or not)
                    setFormData((prev) => ({
                      ...prev,
                      amount: inputValue,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full flex flex-col gap-y-0">
              <div className="flex gap-1 items-start justify-center">
                <label className="text-sm font-medium text-gray-700 mb-3 block ">
                  Charge
                </label>
                <span className="text-red-600">*</span>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                {loadingCharge && (
                  <span className="absolute  right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <TailSpin height="25" width="25" color="#4fa94d" />
                  </span>
                )}

                <input
                  type="number"
                  className=" w-full pl-8 pr-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-lg focus:border-[#14192E] focus:ring-2 focus:ring-[#14192E]/20 transition-all duration-200 cursor-not-allowed"
                  placeholder="0.00"
                  value={
                    isModalOpen &&
                    // transType !== "NEFT" &&
                    chargeValue
                      ? chargeValue
                      : "0"
                  }
                  onChange={(e) => {
                    setChargeValue(e?.target?.value);
                  }}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500 ">
          {word && (
            <span>
              {word} {" Rupees only"}
            </span>
          )}
        </div>
        {amountError && (
          <p className="text-red-500 text-xs mt-1">{amountError}</p>
        )}
        {!(transType === "EP" || transType === "CC" || transType === "FW") && (
          <>
            <label className="text-sm font-medium text-gray-700  block">
              Enter First Six Digits of Card
              <span className="text-red-500"> *</span>
            </label>

            {/*  <span
                                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500`}
                                        >
                                          #
                                        </span> */}
            <input
              tabIndex={4}
              type="text"
              inputMode="numeric" // Shows numeric keyboard on mobile
              maxLength={6}
              pattern="\d*"
              placeholder="XXXXXX"
              className="w-40 px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-lg focus:border-[#14192E] focus:ring-2 focus:ring-[#14192E]/20 transition-all duration-200"
              value={cardLastSixDigits}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCardLastSixDigits(value);
              }}
            />
          </>
        )}

        <div
          className={`${
            (activeForm === "expressPayment" ||
              activeForm === "fundWithdrawal" ||
              activeForm === "creditCardBillPay") &&
            "hidden"
          }`}
        >
          {(serviceFee || markupCharge) && (
            <div className="w-full flex flex-col gap-y-0">
              <div className="w-full flex justify-between">
                <div className="w-48 text-blue-800 text-sm bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-md">
                  <p>
                    Service Fee: <p>₹ {Number(serviceFee ?? 0).toFixed(2)}</p>
                  </p>
                </div>
                <div className="w-48 text-blue-800 text-sm bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-md ">
                  <p>
                    Markup: <p>₹ {Number(markupCharge ?? 0).toFixed(2)}</p>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {(requestAmount || finalAmount) && (
          <div className="w-full flex flex-col gap-y-0">
            <div className="w-full flex justify-between">
              <div className="w-48 text-blue-800 text-sm bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-md">
                {transType === "EP" ||
                transType === "FW" ||
                transType === "CC" ? (
                  <p>
                    Transfer Amount:{" "}
                    <p>₹ {Number(finalAmount ?? 0).toFixed(2)}</p>
                  </p>
                ) : (
                  <p>
                    Load Amount:
                    <p> ₹ {Number(requestAmount ?? 0).toFixed(2)}</p>
                  </p>
                )}
              </div>

              <div className="w-48 text-blue-800 text-sm bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-md">
                {transType === "EP" ||
                transType === "FW" ||
                transType === "CC" ? (
                  <p>
                    Debit Amount:{" "}
                    <p>₹ {Number(requestAmount ?? 0).toFixed(2)}</p>
                  </p>
                ) : (
                  <p>
                    Transfer Amount:
                    <p> ₹ {Number(finalAmount ?? 0).toFixed(2)}</p>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}

      {(transType === "EP" && !isRP) ||
      !(isRP || (transType !== "CC" && transType !== "FW")) ? null : (
        <SlipButtons
          onSlipUpload={handleSlipUpload}
          isRP={isRP}
          senderData={senderData}
          beneficiary={checkedBeneficiary}
          amount={formData.amount}
        />
      )}
      <div className="mt-8 flex items-center justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2.5 bg-[#800505] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
          onClick={() => {
            setIsModalOpen(false);
            setServiceFee("");
            setCardLastSixDigits("");
            setMarkupCharge("");
            setMarkupValue("");
            setMarkupPercentage("");
            setCharge(false);
            setChargeValue(0);
            setFinalAmount("");
            setFormData({});
            setRequestAmount("");
            setWord("");
            setMarkupError("");
          }}
        >
          Cancel
        </button>
        <button
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-lg ${
            !formData.amount ||
            amountError ||
            loadingCharge ||
            // cardLastSixDigits checks only for non-EP/CC/FW types
            (transType !== "EP" &&
              transType !== "CC" &&
              transType !== "FW" &&
              (cardLastSixDigits === null ||
                cardLastSixDigits === undefined ||
                cardLastSixDigits === "" ||
                cardLastSixDigits?.length !== 6 ||
                Number(cardLastSixDigits) <= 0)) ||
            // slipUrl only required if Button B is visible
            (!(
              (transType === "EP" && !isRP) ||
              !(isRP || (transType !== "CC" && transType !== "FW"))
            ) &&
              !slipUrl)
              ? "bg-gray-400 text-gray-800 cursor-not-allowed shadow-none"
              : "bg-[#4b5a9f] text-white hover:bg-opacity-90 shadow-indigo-200"
          }`}
          type="submit"
          disabled={
            Number(requestAmount) <= 0 ||
            Number(finalAmount) <= 0 ||
            !formData.amount ||
            amountError ||
            loadingCharge ||
            (transType !== "EP" &&
              transType !== "CC" &&
              transType !== "FW" &&
              (cardLastSixDigits === null ||
                cardLastSixDigits === undefined ||
                cardLastSixDigits === "" ||
                cardLastSixDigits?.length !== 6 ||
                Number(cardLastSixDigits) <= 0)) ||
            (!(
              (transType === "EP" && !isRP) ||
              !(isRP || (transType !== "CC" && transType !== "FW"))
            ) &&
              !slipUrl)
          }
        >
          Proceed to Transfer
        </button>
      </div>
    </div>
  );
};

export default RightForm;
