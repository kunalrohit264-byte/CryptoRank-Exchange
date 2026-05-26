// Main.js

import React, { useState } from "react";
import Table from "./Table";

function Main() {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const totalBalance = 17042.67;

  let error = "";

  // validation
  if (inputValue === "") {
    if (touched) {
      error = "Amount cannot be empty";
    }
  } else if (Number(inputValue) < 0.01) {
    error = "Amount cannot be less than $0.01";
  } else if (Number(inputValue) > totalBalance) {
    error = "Amount cannot exceed the available balance";
  }

  const handleChange = (e) => {
    setTouched(true);
    setInputValue(e.target.value);
  };

  return (
    <div className="layout-column align-items-center mx-auto">
      <h1>CryptoRank Exchange</h1>

      <section>
        <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
          <label>
            I want to exchange $
            <input
              className="w-10"
              data-testid="amount-input"
              type="number"
              placeholder="USD"
              value={inputValue}
              onChange={handleChange}
            />{" "}
            USD of my ${totalBalance}:
          </label>

          {error && (
            <p
              data-testid="error"
              className="form-hint error-text mt-3 pl-0 ml-0"
            >
              {error}
            </p>
          )}
        </div>
      </section>

      <Table inputValue={inputValue} error={error} />
    </div>
  );
}

export default Main;
