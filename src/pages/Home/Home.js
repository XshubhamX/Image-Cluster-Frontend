import React, { useState } from "react";
import SearchTab from "../../components/SearchComponent";

import "../CSS/Grid.css";

const Home = () => {
  // const [drop, setDrop] = useState(true);

  const [show, setShow] = useState(true);

  return (
    <>
      <div className="search-container">
        <SearchTab />
      </div>
    </>
  );
};
export default Home;
