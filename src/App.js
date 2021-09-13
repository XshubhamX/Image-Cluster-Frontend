import React from "react";
import Home from "./pages/Home/Home";
import FileUpload from "./pages/Upload/Upload";
import Illustrations from "./pages/Illustrations/Illustrations";
import Images from "./pages/Images/Images";
import FileFromKey from "./pages/Search/FileFromKey";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/upload" component={FileUpload} />
        <Route path="/images" component={Images} />
        <Route path="/illustrations" component={Illustrations} />
        <Route path="/search" component={FileFromKey} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
