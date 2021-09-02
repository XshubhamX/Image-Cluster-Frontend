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

  return (
    <>
      <div className="search-page__center-container ">
        <div id="gallery" class="container-fluid">
          {data && data.allIllustrations.illus
            ? data.allIllustrations.illus.map((x, i) => {
                return (
                  <>
                    <LazyLoad height={-50}>
                      <div className="picture-container">
                        <a
                          href={x.file}
                          key={i}
                          download
                          className="picture-container"
                        >
                          <FiDownload />
                        </a>
                        <img src={x.preview} class="img-responsive" alt="dq" />
                      </div>
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
