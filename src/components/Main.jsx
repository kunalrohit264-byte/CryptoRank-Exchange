// Main.js

import React, { useState } from "react";
import Table from "./Table";
import { cryptocurrencyList } from "../cryptocurrency-list";
import Chart from "./Chart";

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

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Trending: top 3 by rate (simple heuristic)
  const trending = cryptocurrencyList
    .slice()
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 3);

  const calcCoins = (rate) => {
    if (inputValue === "") return "0.000000";
    if (error) return "n/a";
    return (Number(inputValue) * rate).toFixed(6);
  };

  return (
    <div className="layout-column align-items-center mx-auto">
      <h1>CryptoRank Exchange</h1>

      <section>
        <div className="trending-container">
          <h3 className="trending-title">Trending</h3>
          <div className="trending-list">
            {trending.map((c) => (
              <div key={c.code} className="trending-card">
                <div className="trending-header">
                  <strong>{c.name}</strong>
                  <span className="code">{c.code}</span>
                </div>
                <div className="trending-body">
                  <div className="rate">
                    1 USD = {c.rate} {c.code}
                  </div>
                  <div className="coins">
                    {calcCoins(c.rate)} {c.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

      <section className="mt-8 mb-4">
        <div className="layout-row align-items-center justify-center">
          <input
            aria-label="Filter cryptocurrencies"
            placeholder="Search by name or code"
            value={filter}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>
      </section>

      <Table inputValue={inputValue} error={error} filter={filter} />

      <section className="charts-section mt-8">
        <h3 className="charts-title">Market Sparks</h3>
        <div className="charts-grid">
          {cryptocurrencyList.map((c) => (
            <Chart key={c.code} currency={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Main;
