import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import {button} from "bloomer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import "bulma/css/bulma.css";
import {ApolloClient, gql, HttpLink, InMemoryCache} from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://bold-metrics.herokuapp.com/v1/graphql"
});

const client = new ApolloClient({
  cache,
  link
})


function App() {
  return (
    <ApolloProvider client = {client}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
