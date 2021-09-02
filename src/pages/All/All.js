import React, { useState } from "react";
import { ALL } from "../../graphql/getAll";
import { useQuery } from "@apollo/client";
import LazyLoad from "react-lazyload";
import { FiDownload } from "react-icons/fi";

const All = () => {
  const { error, data, loading } = useQuery(ALL, {
    fetchPolicy: "network-only",
  });

  let reverts;
  // if (loading) {
  //   reverts = <Spinner />;
  // }else{
  //   reverts = null
  // }

  console.log("all", data);

  return (
    <>
      <div className="search-page__center-container ">
        <div id="gallery" class="container-fluid">
          {data && data.getAll.all
            ? data.getAll.all.map((x, i) => {
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
export default All;
