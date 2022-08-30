import React, { useState } from "react";
import "./index.css";

// While paginated API, only need 1st page for this

const CountrySearch = () => {
  return (
    <div className="mt-75 layout-column justify-content-center align-items-center">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="Country"
          data-testid="app-input"
        />
        <button type="submit" className="ml-30" data-testid="submit-button">
          Search Country
        </button>
      </section>

      <h1 className="styled mt-50" data-testid="country-name"></h1>
      <p className="styled mt-50" data-testid="country-border"></p>
    </div>
  );
};

export default CountrySearch;
