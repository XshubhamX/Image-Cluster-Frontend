import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";

// import 'react-dropdown/style.css';
const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer " + localStorage.getItem("token") || "",
  },
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
