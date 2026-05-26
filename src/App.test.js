/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import App from "./App";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { cryptocurrencyList } from "./cryptocurrency-list";
import "@testing-library/jest-dom/extend-expect";
global.console.error = jest.fn();

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

describe("Initial rendering", () => {
  it("should have empty input field", () => {
    const { getByTestId } = renderApp();
    expect(getByTestId("amount-input")).toHaveValue(null);
  });

  it("should not display any errors", () => {
    const { queryByTestId } = renderApp();
    expect(queryByTestId("error")).not.toBeInTheDocument();
  });

  it("Table should display currency and rates with number of coins as 0.00000000", () => {
    const { getByTestId } = renderApp();
    for (let i = 0; i < cryptocurrencyList.length; i++) {
      expect(
        getByTestId("exchange-data").children[i].children[0],
      ).toHaveTextContent(cryptocurrencyList[i].name);
      expect(
        getByTestId("exchange-data").children[i].children[1],
      ).toHaveTextContent(
        "1 USD = ",
        cryptocurrencyList[i].rate,
        " ",
        cryptocurrencyList[i].code,
      );
      expect(
        getByTestId("exchange-data").children[i].children[2],
      ).toHaveTextContent(0.0);
    }
  });
});

describe("Errors", () => {
  it("should display error saying - 'Amount cannot be empty' when field is empty after entering some value", () => {
    const { getByTestId, queryByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), { target: { value: 123 } });
    expect(queryByTestId("error")).not.toBeInTheDocument();
    fireEvent.change(getByTestId("amount-input"), { target: { value: "" } });
    expect(queryByTestId("error")).toBeInTheDocument();
    expect(queryByTestId("error")).toHaveTextContent("Amount cannot be empty");
  });

  it("should display error saying - 'Amount cannot be less than $0.01' when input value is less than 0.01", () => {
    const { getByTestId, queryByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), { target: { value: -123 } });
    expect(queryByTestId("error")).toBeInTheDocument();
    expect(queryByTestId("error")).toHaveTextContent(
      "Amount cannot be less than $0.01",
    );
  });

  it("should display error saying - 'Amount cannot exceed the available balance' when input value greater than the available balance", () => {
    const { getByTestId, queryByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), {
      target: { value: 123456 },
    });
    expect(queryByTestId("error")).toBeInTheDocument();
    expect(queryByTestId("error")).toHaveTextContent(
      "Amount cannot exceed the available balance",
    );
  });

  it("should display 'n/a' in the last column of table in case of error scenarios", () => {
    const { getByTestId, queryByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), {
      target: { value: 123456 },
    });
    expect(queryByTestId("error")).toBeInTheDocument();
    for (let i = 0; i < cryptocurrencyList.length; i++) {
      expect(
        getByTestId("exchange-data").children[i].children[2],
      ).toHaveTextContent("n/a");
    }
    fireEvent.change(getByTestId("amount-input"), { target: { value: -123 } });
    for (let i = 0; i < cryptocurrencyList.length; i++) {
      expect(
        getByTestId("exchange-data").children[i].children[2],
      ).toHaveTextContent("n/a");
    }
  });
});

describe("Correct input", () => {
  it("should not display any errors for correct input", () => {
    const { getByTestId, queryByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), { target: { value: 123 } });
    expect(queryByTestId("error")).not.toBeInTheDocument();
  });

  it("should display exchange data in table", () => {
    const { getByTestId } = renderApp();
    fireEvent.change(getByTestId("amount-input"), { target: { value: 12 } });
    for (let i = 0; i < cryptocurrencyList.length; i++) {
      expect(
        getByTestId("exchange-data").children[i].children[0],
      ).toHaveTextContent(cryptocurrencyList[i].name);
      expect(
        getByTestId("exchange-data").children[i].children[1],
      ).toHaveTextContent(
        "1 USD = ",
        cryptocurrencyList[i].rate,
        " ",
        cryptocurrencyList[i].code,
      );
      expect(
        getByTestId("exchange-data").children[i].children[2],
      ).toHaveTextContent((12 * cryptocurrencyList[i].rate).toFixed(8));
    }
  });
});
