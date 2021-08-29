import React, { useState } from "react";
import { ALL_ILLUSTRATIONS } from "../../graphql/allIllustrations";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/Spinner";
import "../CSS/Grid.css";

const Illustrations = () => {
  const [allImages, setAllImages] = useState([]);
  const { error, data, loading } = useQuery(ALL_ILLUSTRATIONS);

  let reverts;
  if (!error) {
    reverts = <Spinner />;
  } else {
    reverts = <h2>Error</h2>;
  }

  return (
    <>
      <div class="container">
        {data
          ? data.allIllustrations.illus.map((x, i) => {
              return (
                <>
                  <a href={x.file} key={i} download>
                    <img src={x.preview} class="img-responsive" alt="dq" />
                  </a>
                </>
              );
            })
          : reverts}
      </div>
    </>
  );
};
export default Illustrations;
