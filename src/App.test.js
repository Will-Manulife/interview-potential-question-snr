import React from "react";
import App from "./App";
import { render, fireEvent, cleanup } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import "@testing-library/jest-dom/extend-expect";

fetchMock.enableMocks();

const renderApp = () => render(<App />);

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(() => {
  cleanup();
});

test("initial UI is rendered as expected", () => {
  let { getByTestId, queryByTestId } = renderApp();
  expect(getByTestId("app-input").value).toBeFalsy();
  expect(getByTestId("submit-button")).toHaveTextContent("Search Country");
  expect(queryByTestId("country-name")).toBe(null);
  expect(queryByTestId("country-border")).toBe(null);
});

test("button searches country", async () => {
  fetch.mockResponseOnce(JSON.stringify(testDataCanada));
  let { getByTestId, findByTestId } = renderApp();

  const input = getByTestId("app-input");
  fireEvent.input(input, {
    target: { value: "Canada" },
  });
  const addButton = getByTestId("submit-button");
  fireEvent.click(addButton);

  const countryName = await findByTestId("country-name");
  expect(countryName).toHaveTextContent("Canada");

  const borderCountry = await findByTestId("country-border");
  expect(borderCountry).toHaveTextContent("USA");
});

test("multiple borders load successfully", async () => {
  fetch.mockResponseOnce(JSON.stringify(testDataChina));
  let { getByTestId, findByTestId, findAllByTestId } = renderApp();

  const input = getByTestId("app-input");
  fireEvent.input(input, {
    target: { value: "China" },
  });
  const addButton = getByTestId("submit-button");
  fireEvent.click(addButton);

  const countryName = await findByTestId("country-name");
  expect(countryName).toHaveTextContent("China");

  const borderCountries = await findAllByTestId("country-border");
  const expectedBorders = testDataChina.data[0].borders;
  const actualBorders = borderCountries.map((x) => x.textContent);
  expect(expectedBorders.sort()).toEqual(actualBorders.sort());
});

test("after searching country input has no value", async () => {
  fetch.mockResponseOnce(JSON.stringify(testDataCanada));
  let { getByTestId, findByTestId } = renderApp();

  const input = getByTestId("app-input");
  fireEvent.input(input, {
    target: { value: "Canada" },
  });
  const addButton = getByTestId("submit-button");
  fireEvent.click(addButton);

  const countryName = await findByTestId("country-name");
  expect(countryName).toHaveTextContent("Canada");

  const borderCountry = await findByTestId("country-border");
  expect(borderCountry).toHaveTextContent("USA");

  expect(getByTestId("app-input").value).toBeFalsy();
});

test("no country results on empty input", () => {
  fetch.mockResponseOnce(JSON.stringify({ data: [] }));
  let { getByTestId, queryByTestId } = renderApp();

  const input = getByTestId("app-input");
  fireEvent.input(input, {
    target: { value: "" },
  });
  const addButton = getByTestId("submit-button");
  fireEvent.click(addButton);

  expect(queryByTestId("country-name")).toBe(null);
  expect(queryByTestId("country-border")).toBe(null);
});

const testDataCanada = {
  "page": 1,
  "per_page": 10,
  "total": 1,
  "total_pages": 1,
  "data": [
    {
      "name": "Canada",
      "nativeName": "Canada",
      "topLevelDomain": [".ca"],
      "alpha2Code": "CA",
      "numericCode": "124",
      "alpha3Code": "CAN",
      "currencies": ["CAD"],
      "callingCodes": ["1"],
      "capital": "Ottawa",
      "altSpellings": ["CA"],
      "relevance": "2",
      "region": "Americas",
      "subregion": "Northern America",
      "language": ["English", "French"],
      "languages": ["en", "fr"],
      "translations": {
        "de": "Kanada",
        "es": "Canadá",
        "fr": "Canada",
        "it": "Canada",
        "ja": "カナダ",
        "nl": "Canada",
        "hr": "Kanada",
      },
      "population": 35749600,
      "latlng": [60, -95],
      "demonym": "Canadian",
      "borders": ["USA"],
      "area": 9984670,
      "gini": 32.6,
      "timezones": [
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00",
        "UTC-05:00",
        "UTC-04:00",
        "UTC-03:30",
      ],
    },
  ],
};

const testDataChina = {
  "page": 1,
  "per_page": 10,
  "total": 1,
  "total_pages": 1,
  "data": [
    {
      "name": "China",
      "nativeName": "中国",
      "topLevelDomain": [".cn"],
      "alpha2Code": "CN",
      "numericCode": "156",
      "alpha3Code": "CHN",
      "currencies": ["CNY"],
      "callingCodes": ["86"],
      "capital": "Beijing",
      "altSpellings": [
        "CN",
        "Zhōngguó",
        "Zhongguo",
        "Zhonghua",
        "People's Republic of China",
        "中华人民共和国",
        "Zhōnghuá Rénmín Gònghéguó",
      ],
      "relevance": "0",
      "region": "Asia",
      "subregion": "Eastern Asia",
      "language": ["Standard Chinese"],
      "languages": ["zh"],
      "translations": {
        "de": "China",
        "es": "China",
        "fr": "Chine",
        "it": "Cina",
        "ja": "中国",
        "nl": "China",
        "hr": "Kina",
      },
      "population": 1371590000,
      "latlng": [35, 105],
      "demonym": "Chinese",
      "borders": [
        "AFG",
        "BTN",
        "MMR",
        "HKG",
        "IND",
        "KAZ",
        "PRK",
        "KGZ",
        "LAO",
        "MAC",
        "MNG",
        "PAK",
        "RUS",
        "TJK",
        "VNM",
      ],
      "area": 9640011,
      "gini": 47,
      "timezones": ["UTC+08:00"],
    },
  ],
};
