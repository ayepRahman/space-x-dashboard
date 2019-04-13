import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routeTemplates from 'ui/routes/templates';

import Home from 'ui/routes/home';

export const App = () => {
  return (
    <Router>
      <Route exact path={routeTemplates.home} component={Home} />
    </Router>
  );
};

export default App;
