import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routeTemplates from 'ui/routes/templates';

import AppLayout from 'ui/app/layout';
// import AuthenticatedRoute from 'ui/app/auth/AuthenticatedRoute';

import Home from 'ui/routes/home';
import Login from 'ui/routes/login';
import Signup from 'ui/routes/signup';

export const App = () => {
  return (
    <Router>
      <AppLayout>
        <Route exact path={routeTemplates.home} component={Home} />
        <Route exact path={routeTemplates.auth.login} component={Login} />
        <Route exact path={routeTemplates.auth.signup} component={Signup} />
      </AppLayout>
    </Router>
  );
};

export default App;
