import React, { useState } from "react";
import "./index.css";

// While paginated API, only need 1st page for this

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});

  const onClick = () => {
    fetch(`https://jsonmock.hackerrank.com/api/countries?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data[0]);
        setSearchTerm("");
      });
  };

  return (
    <div className="mt-75 layout-column justify-content-center align-items-center">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="Country"
          data-testid="app-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="submit-button"
          onClick={onClick}
        >
          Search Country
        </button>
      </section>

      {data && data.name && (
        <h3 className="styled mt-50" data-testid="country-name">
          {data.name}
        </h3>
      )}
      {data &&
        data.borders &&
        data.borders.map((border, index) => {
          return (
            <p
              className="styled mt-50"
              data-testid="country-border"
              key={index}
            >
              {border}
            </p>
          );
        })}
    </div>
  );
};

export default CountrySearch;
