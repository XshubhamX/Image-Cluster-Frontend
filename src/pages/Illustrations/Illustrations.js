import React, { useState } from "react";
import { ALL_ILLUSTRATIONS } from "../../graphql/allIllustrations";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/Spinner";
import LazyLoad from "react-lazyload";
import { FiDownload } from "react-icons/fi";

const Illustrations = () => {
  const { error, data, loading } = useQuery(ALL_ILLUSTRATIONS, {
    fetchPolicy: "network-only",
  });

  let reverts;
  // if (loading) {
  //   reverts = <Spinner />;
  // } else {
  //   reverts = null;
  // }

  console.log("illus", data);
  const classNames = ["big", "horizontal", "vertical"];

  return (
    <>
      <div className="search-page__center-container ">
        <div className="gallery">
          {data && data.allIllustrations.illus
            ? data.allIllustrations.illus.map((x, i) => {
                return (
                  <>
                    <LazyLoad height={-50}>
                      <a
                        href={x.file}
                        key={i}
                        download
                        className="picture-container"
                      >
                        <img src="./download.gif" alt="download-icon" />
                      </a>
                      <img
                        src={x.preview}
                        class={`${
                          classNames[Math.floor(Math.random() * 3)]
                        } illus`}
                        alt="dq"
                      />
                    </LazyLoad>
                  </>
                );
              })
            : reverts}
        </div>
      </div>
    </>
  );
};
export default Illustrations;
