import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from 'ui/contexts/Auth';
import { Layout, Button, message } from 'antd';
import routeTemplates from 'ui/routes/templates';

const { Header } = Layout;

const AppLayout = ({ history, children, ...others }) => {
  const [hasUser, setHasUser] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setHasUser(true);
    } else {
      setHasUser(false);
    }
  }, [token]);

  const handleLogOut = () => {
    localStorage.clear();
    setHasUser(false);
    history.push(routeTemplates.home);
    message.success('Logout successfully!');
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
