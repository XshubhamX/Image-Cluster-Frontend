import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SearchTab from "../../components/SearchComponentForKey";
import LazyLoad from "react-lazyload";
// import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "../../components/MessageModal";

// import { FiDownload } from "react-icons/fi";

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

  // console.log("fromkey", field);
  // console.log("fromkey", key);

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
    // console.log("fromkey", fieldFromParam);
    // console.log("fromkey", keyFromParam);

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
    // console.log(key);
    // console.log(field);
    // console.log(keyFromParam);
  }, [query]);

  // let reverts;
  // if (!error) {
  //   reverts = <Spinner />;
  // } else {
  //   reverts = <h2>error</h2>;
  // }

  const classNames = ["big", "horizontal", "vertical"];

  return (
    <>
      {loading && <Spinner />}
      <div className="search-page">
        <div className="search-page__search-box">
          <Link to="/">
            <img src="/fstock.png" alt="" />
          </Link>
          <SearchTab
            // removeKey={() => console.log("---------------------------")}
            val={key}
          />
        </div>
        <div className="search-page__center-container">
          <div className="gallery">
            {data && data.fileFromKeyword.files
              ? data.fileFromKeyword.files.map((x, i) => {
                  if (!data.fileFromKeyword.files.length) {
                    // console.log("fwefewfwfwef");
                    return <Modal showModal={true} />;
                  }
                  if (data.fileFromKeyword.files.length === 1) {
                    return (
                      <LazyLoad height={-50} style={{ position: "relative" }}>
                        <a href={x.file} key={i} download>
                          <img src="./download.gif" alt="download-icon" />
                        </a>
                        <img
                          src={x.preview}
                          class={classNames[Math.floor(Math.random() * 3)]}
                          alt="dq"
                        />
                      </LazyLoad>
                    );
                  }
                  let extention = "illus";
                  let arr = x.file.split(".");
                  let ext = arr[arr.length - 1];
                  if (["jpg", "jpeg", "png", "pjp"].includes(ext)) {
                    extention = "";
                  }
                  return (
                    <>
                      <LazyLoad key={i} height={-50} className={extention}>
                        <a
                          href={x.file}
                          key={i}
                          download
                          className="download-icon"
                        >
                          <img src="./download.gif" alt="download-icon" />
                        </a>
                        <img
                          src={x.preview}
                          className={`${
                            classNames[Math.floor(Math.random() * 3)]
                          }`}
                          alt="dq"
                        />
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
