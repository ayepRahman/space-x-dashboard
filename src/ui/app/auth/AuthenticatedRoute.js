/**
 * Check if user Exist in firebase and redirect to page
 */

import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import routeTemplates from 'ui/app/common/routeTemplates';

const AuthenticatedRoute = props => {
  const [state, setState] = useState({
    isAuthenticated: false,
    pending: true,
  });

  /**
   * TODO: check for localStorage UserToken, if exist check the validity of the token
   * if valid then user able to login
   */
  // const { user } = useContext(FirebaseContext);
  const { component: WrapComponent, enqueueSnackbar, ...others } = props;
  const hasUser = true;
  const user = {};

  useEffect(() => {
    if (hasUser) {
      setState({
        ...state,
        pending: false,
        isAuthenticated: hasUser,
      });
    }
  });

  return (
    <Route
      {...others}
      render={routeProps => {
        if (state.pending) return <p>...loading</p>;

        return state.isAuthenticated ? (
          <WrapComponent user={user} {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: routeTemplates.home,
            }}
          />
        );
      }}
    />
  );
};

export default withRouter(withSnackbar(AuthenticatedRoute));
