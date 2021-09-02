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

  return (
    <>
      <div className="search-page__center-container ">
        <div id="gallery" class="container-fluid">
          {data && data.allImages.images
            ? data.allImages.images.map((x, i) => {
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
export default Images;
