import React from "react";
import { ALL_ILLUSTRATIONS } from "../../graphql/allIllustrations";
import { useQuery } from "@apollo/client";
// import Spinner from "../../components/Spinner";
import LazyLoad from "react-lazyload";
// import { FiDownload } from "react-icons/fi";

const Illustrations = () => {
  const { data } = useQuery(ALL_ILLUSTRATIONS, {
    fetchPolicy: "network-only",
  });

  let reverts;
  // if (loading) {
  //   reverts = <Spinner />;
  // } else {
  //   reverts = null;
  // }

  const classNames = ["big", "horizontal", "vertical"];

  return (
    <>
      <div className="search-page__center-container ">
        <div className="gallery">
          {data && data.allIllustrations.illus
            ? data.allIllustrations.illus.map((x, i) => {
                return (
                  <>
                    <LazyLoad height={-50} className="illus">
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
                        className={`${
                          classNames[Math.floor(Math.random() * 3)]
                        } `}
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
