import React, { useState } from "react";
import { ALL_IMAGES } from "../../graphql/allImages";
import { useQuery } from "@apollo/client";
import LazyLoad from "react-lazyload";
import Spinner from "../../components/Spinner";
import { FiDownload } from "react-icons/fi";
const Images = () => {
  const { error, data, loading } = useQuery(ALL_IMAGES, {
    fetchPolicy: "network-only",
  });

  let reverts;
  // if (loading) {
  //   reverts = <Spinner />;
  // }else{
  //   reverts = null
  // }

  console.log("images", data);

  const classNames = ["big", "horizontal", "vertical"];

  return (
    <>
      <div className="search-page__center-container ">
        <div className="gallery">
          {data && data.allImages.images
            ? data.allImages.images.map((x, i) => {
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
                        class={classNames[Math.floor(Math.random() * 3)]}
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
export default Images;
