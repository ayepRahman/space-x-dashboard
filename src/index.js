import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

// APOLLO CLIENTSTATE
import { defaults } from 'ui/apollo/defaults';
import { resolvers } from 'ui/apollo/resolvers';

// import { theme } from 'styles/theme';

import App from 'ui/app';
import * as serviceWorker from './serviceWorker';

import 'styles/index.scss';
// import 'antd/dist/antd.css';

const spaceXApi = process.env.REACT_APP_SPACE_X_API;
const apolloCache = new InMemoryCache();

const clientStateLink = withClientState({
  resolvers,
  defaults,
  cache: apolloCache,
});

const httpLink = new HttpLink({
  uri: spaceXApi,
  headers: {
    authorization: localStorage.getItem('token'),
    'client-name': 'Space X Explorer [web]',
    'client-version': '1.0.0',
  },
});

const combineLinks = ApolloLink.from([clientStateLink, httpLink]);

const client = new ApolloClient({
  link: combineLinks,
  cache: apolloCache,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
