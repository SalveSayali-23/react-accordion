import React, { useState, useEffect } from "react";
import "./styles.css";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );
  console.log(filteredCountries);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="search countries"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-bar"
      />
      {filteredCountries.length > 0 ? (
        <div className="country-cards">
          {filteredCountries.map((country, index) => {
            return (
              <div className="countryCard" key={index}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="flag"
                />
                <p>{country.name.common}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Country;