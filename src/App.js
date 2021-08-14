import React from 'react';
import './App.css';
import Layout from "./components/Layout"
import Home from "./pages/Home/Home"
import FileUpload from './pages/Upload/Upload';
import Illustrations from "./pages/Illustrations/Illustrations"
import Images from "./pages/Images/Images"
import { Route, Switch, Redirect } from "react-router-dom"

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/upload" component={FileUpload} />
      <Route path="/images" component={Images} />
      <Route path="/illustrations" component={Illustrations} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;