// Table.js

import React from "react";
import { cryptocurrencyList } from "../cryptocurrency-list";

function Table({ inputValue, error }) {
  const getCoins = (rate) => {
    // initial rendering
    if (inputValue === "") {
      return "0.00000000";
    }

    // invalid input
    if (error) {
      return "n/a";
    }

    // valid input
    return (Number(inputValue) * rate).toFixed(8);
  };

  return (
    <div className="card card-text mt-10 mx-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Exchange Rate</th>
            <th>Number of Coins</th>
          </tr>
        </thead>

        <tbody data-testid="exchange-data">
          {cryptocurrencyList.map((currency) => (
            <tr key={currency.code}>
              <td>{currency.name}</td>

              <td>
                1 USD = {currency.rate} {currency.code}
              </td>

              <td>{getCoins(currency.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
