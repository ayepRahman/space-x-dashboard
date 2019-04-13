import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routeTemplates from 'ui/routes/templates';

import AppLayout from 'ui/app/layout';

import Home from 'ui/routes/home';

export const App = () => {
  return (
    <Router>
      <AppLayout>
        <Route exact path={routeTemplates.home} component={Home} />
      </AppLayout>
    </Router>
  );
};

export default App;
