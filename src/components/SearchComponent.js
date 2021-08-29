import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "../pages/CSS/SearchTab.css";
import { Redirect, Link } from "react-router-dom";
import Dropdown from "react-dropdown";
const options = ["All", "Image", "Illustration"];
const SEARCH_IMAGE = gql`
  query search($field: String!, $key: String!) {
    search(field: $field, key: $key) {
      payload
    }
  }
`;

const SearchComponent = (props) => {
  const [key, setKey] = useState("");
  const [field, setField] = useState("All");

  const { error, data, loading } = useQuery(SEARCH_IMAGE, {
    variables: {
      field: field.toLocaleLowerCase(),
      key,
    },
  });

  const handelOnChange = (e) => {
    setField(e.value);
  };

  const queryHandler = (e) => {
    setKey(e.target.value);
  };

  return (
    <>
      <main className="search-bar">
        <div className="container1">
          <form className="autocomplete-container">
            <div
              className="autocomplete"
              role="combobox"
              aria-expanded="false"
              aria-owns="autocomplete-results"
              aria-haspopup="listbox"
            >
              <Dropdown
                options={options}
                onChange={handelOnChange}
                value={field}
                placeholder="Select an option"
              />
              <input
                className="autocomplete-input"
                placeholder="Search for Keywords"
                aria-label="Search for Keywords"
                aria-autocomplete="both"
                aria-controls="autocomplete-results"
                id="searchTab"
                onChange={queryHandler}
              />
              <Link
                type="submit"
                className="autocomplete-submit"
                aria-label="Search"
                to={`/search?field=${field}&key=${key}&limit=${15}`}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
              </Link>
            </div>
            {console.log(data)}
            {data && data.search.payload ? (
              <ul
                id="autocomplete-results"
                className="autocomplete-results"
                role="listbox"
                aria-label="Search for a fruit or vegetable"
              >
                {data && data.search.payload
                  ? data.search.payload.map((x, i) => {
                      if (i < 5) {
                        return (
                          <Link
                            to={`/search?field=${field}&key=${x}&limit${15}`}
                            key={x}
                            className="autocomplete-result__row"
                          >
                            <li id={i} className="autocomplete-result">
                              {x}
                            </li>
                          </Link>
                        );
                      }
                    })
                  : null}
              </ul>
            ) : null}
          </form>
          <p className="search-result"></p>
        </div>
      </main>
    </>
  );
};

export default SearchComponent;