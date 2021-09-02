import React, { useEffect, useState } from "react";
import SearchTab from "../../components/SearchComponent";
import Images from "../Images/Images";
import { useLocation } from "react-router-dom";
import Illustrations from "../Illustrations/Illustrations";
import All from "../All/All";

const Home = () => {
  // const [drop, setDrop] = useState(true);

  const [field, setField] = useState("");
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  // useEffect(() => {
  //   let fieldFromParam = query.get("field")
  //     ? query.get("field").toLowerCase()
  //     : null;

  //   if (!fieldFromParam) {
  //     setField("image");
  //   } else if (!["image", "illustration"].includes(fieldFromParam)) {
  //     setField("image");
  //   } else {
  //     setField(fieldFromParam);
  //   }
  //   console.log(field);
  // }, []);

  let mainImages;

  if (query.get("field") === "image") {
    mainImages = <Images />;
  } else if (query.get("field") === "illustration") {
    console.log("h");
    mainImages = <Illustrations />;
  } else {
    mainImages = <All />;
  }

  return (
    <>
      <div className="search-container">
        <SearchTab />
      </div>
      {mainImages}
    </>
  );
};
export default Home;
