import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import { ClassInfo} from "./Pages/classinfo";
import { GPARank } from "./Pages/gparank";
import "bulma/css/bulma.css";
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
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
        <Route path="/:classId/:studentId" component={ClassInfo} />
        <Route path="/gparank">
          <GPARank />
        </Route>
        <Route path ="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
