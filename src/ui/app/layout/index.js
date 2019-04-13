import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Button } from 'antd';
import routeTemplates from 'ui/routes/templates';

const { Header } = Layout;

const AppLayout = ({ history, children, ...others }) => {
  const [hasUser, setHasUser] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setHasUser(true);
    }
  }, [token]);

  const handleLogOut = () => {
    localStorage.clear();
    setHasUser(false);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="d-flex">
          <h2 className="text-white py-2">Space X Explorer</h2>
          <div className="ml-auto d-flex">
            {hasUser ? (
              <div className="">
                <Button onClick={() => handleLogOut()}>Logout</Button>
              </div>
            ) : (
              <Fragment>
                <div className="pr-3">
                  <Button onClick={() => history.push(routeTemplates.auth.login)}>Login</Button>
                </div>
                <div>
                  <Button onClick={() => history.push(routeTemplates.auth.signup)}>Signup</Button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Header>
      {children}
    </Layout>
  );
};

export default withRouter(AppLayout);
