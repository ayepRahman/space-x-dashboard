/**
 * Check if user Exist in firebase and redirect to page
 */

import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from 'ui/contexts/Auth';
import { Spin, message, Row, Col } from 'antd';

import routeTemplates from 'ui/routes/templates';

const AuthenticatedRoute = props => {
  const { component: WrapComponent, ...others } = props;
  const [state, setState] = useState({
    isAuthenticated: false,
    pending: true,
  });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setState({
        ...state,
        isAuthenticated: true,
        pending: false,
      });
    } else {
      setState({
        ...state,
        isAuthenticated: false,
        pending: false,
      });
    }
  }, [token]);

  return (
    <Route
      {...others}
      render={routeProps => {
        if (state.pending)
          return (
            <Row className="pt-5">
              <Col className="text-center">
                <Spin tip="Loading..." />
              </Col>
            </Row>
          );

        if (state.isAuthenticated) {
          return <WrapComponent {...routeProps} />;
        } else {
          message.warning('Please login to access!');
          return (
            <Redirect
              to={{
                pathname: routeTemplates.home,
              }}
            />
          );
        }
      }}
    />
  );
};

export default withRouter(AuthenticatedRoute);
