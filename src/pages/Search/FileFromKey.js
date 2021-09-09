import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SearchTab from "../../components/SearchComponentForKey";
import LazyLoad from "react-lazyload";

import { FiDownload } from "react-icons/fi";

const FILE_FROM_KEY = gql`
  query fileFromKeyword($field: String, $key: String) {
    fileFromKeyword(field: $field, key: $key) {
      files {
        file
        preview
      }
    }
  }
`;

const FileFromKey = () => {
  const [field, setField] = useState("");
  const [key, setKey] = useState("");
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const { data, loading } = useQuery(FILE_FROM_KEY, {
    variables: {
      field,
      key,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    let fieldFromParam = query.get("field")
      ? query.get("field").toLowerCase()
      : null;

    let keyFromParam = query.get("key") ? query.get("key").toLowerCase() : null;

    if (!keyFromParam) {
      if (!fieldFromParam) {
        setField("all");
      } else if (!["all", "image", "illustration"].includes(fieldFromParam)) {
        setField("all");
      } else {
        setField(fieldFromParam);
      }
      setKey(null);
    } else {
      if (fieldFromParam) {
        if (["all", "image", "illustration"].includes(fieldFromParam)) {
          setField(fieldFromParam);
        } else {
          setField("all");
        }
      } else {
        setField("all");
      }
      setKey(keyFromParam);
    }

    console.log(keyFromParam);
  }, [query, search, data]);

  // let reverts;
  // if (!error) {
  //   reverts = <Spinner />;
  // } else {
  //   reverts = <h2>error</h2>;
  // }

  return (
    <>
      {loading && <Spinner />}
      <div className="search-page">
        <div className="search-page__search-box">
          <SearchTab
            removeKey={() => console.log("---------------------------")}
          />
        </div>
        <div className="search-page__center-container">
          <div id="gallery" class="container-fluid">
            {data && data.fileFromKeyword.files
              ? data.fileFromKeyword.files.map((x, i) => {
                  return (
                    <>
                      <LazyLoad height={200}>
                        <div className="picture-container">
                          <a href={x.file} key={i} download>
                            <FiDownload />
                          </a>
                          <img
                            src={x.preview}
                            class="img-responsive"
                            alt="dq"
                          />
                        </div>
                      </LazyLoad>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileFromKey;
