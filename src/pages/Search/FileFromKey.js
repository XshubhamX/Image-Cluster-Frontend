import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SearchTab from "../../components/SearchComponent";
import "../CSS/Grid.css";
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
  const [limit, setLimit] = useState();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const [loadDisabled, setLoadDisables] = useState(false);

  const { error, data, loading } = useQuery(FILE_FROM_KEY, {
    variables: {
      field,
      key,
    },
  });

  useEffect(() => {
    let fieldFromParam = query.get("field")
      ? query.get("field").toLowerCase()
      : null;

    let keyFromParam = query.get("key") ? query.get("key").toLowerCase() : null;

    let limitFromParam = query.get("limit") ? query.get("limit") : null;

    if (!limitFromParam) {
      setLimit(15);
      query.set("limit", "15");
    } else if (limitFromParam.toLowerCase() !== limitFromParam.toUpperCase()) {
      setLimit(2);
    } else {
      try {
        let parsed = parseInt(limitFromParam);
        setLimit(limitFromParam);
      } catch (error) {
        setLimit(15);
      }
    }

    if (!keyFromParam) {
      if (!fieldFromParam) {
        setField("image");
      } else if (!["image", "illustration"].includes(fieldFromParam)) {
        setField("image");
      } else {
        setField(fieldFromParam);
      }
      setKey(null);
    } else {
      console.log(fieldFromParam);
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
    if (data && data.fileFromKeyword.files) {
      if (data.fileFromKeyword.files.length <= limit) {
        setLoadDisables(true);
      }
    }
  }, [query, search]);

  // let reverts;
  // if (!error) {
  //   reverts = <Spinner />;
  // } else {
  //   reverts = <h2>error</h2>;
  // }

  console.log(data);

  return (
    <>
      {loading && <Spinner />}
      <div className="search-page">
        <SearchTab />
        <div className="search-page__center-container">
          <div id="gallery" class="container-fluid">
            {data && data.fileFromKeyword.files
              ? data.fileFromKeyword.files.map((x, i) => {
                  if (i < limit) {
                    return (
                      <>
                        <div className="picture-container">
                          <a
                            href={x.file}
                            key={i}
                            download
                            className="picture-container"
                          >
                            <FiDownload />
                          </a>
                          <img
                            src={x.preview}
                            class="img-responsive"
                            alt="dq"
                          />
                        </div>
                      </>
                    );
                  }
                })
              : null}
          </div>
        </div>
        {!loading && data && data.fileFromKeyword.files ? (
          <>
            <Link
              className="load-more__btn"
              to={
                !loadDisabled
                  ? `/search?field=${field}&key=${key ? key : ""}&limit=${
                      parseInt(limit) + 15
                    }`
                  : `/search?field=${field}&key=${
                      key ? key : ""
                    }&limit=${parseInt(limit)}`
              }
            >
              Load More
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
};

export default FileFromKey;
