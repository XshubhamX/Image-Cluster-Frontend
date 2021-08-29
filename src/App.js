import React from "react";
import Home from "./pages/Home/Home";
import FileUpload from "./pages/Upload/Upload";
import Illustrations from "./pages/Illustrations/Illustrations";
import Images from "./pages/Images/Images";
import Header from "./components/Header";
import FileFromKey from "./pages/Search/FileFromKey";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/upload" component={FileUpload} />
      <Route path="/images" component={Images} />
      <Route path="/illustrations" component={Illustrations} />
      <Route path="/search" component={FileFromKey} />
      <Redirect to="/" />
    </Switch>
  );
  return <Header>{routes}</Header>;
};

export default App;
