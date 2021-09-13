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

  const classNames = ["big", "horizontal", "vertical"];

  // if (loading) {
  //   reverts = <Spinner />;
  // }else{
  //   reverts = null
  // }

  console.log("all", data);

  return (
    <>
      <div className="search-page__center-container">
        <div className="gallery">
          {data && data.getAll.all
            ? data.getAll.all.map((x, i) => {
                let extention = "illus";
                if (
                  ["jpg", "jpeg", "png", "pjp"].includes(
                    x.file.split(".").at(-1)
                  )
                ) {
                  extention = "";
                }
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
                        } ${extention}`}
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
export default All;
