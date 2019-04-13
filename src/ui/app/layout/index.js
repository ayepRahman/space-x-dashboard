import React from 'react';
import { withRouter } from 'react-router-dom';

import { Layout, Button } from 'antd';
import { Row, Col } from 'antd';
import routeTemplates from 'ui/routes/templates';

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ history, children, ...others }) => {
  const logOutButton = () => {
    // clear localStorage Token

    return <Button onClick={() => history.push(routeTemplates.auth.login)}>Logout</Button>;
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="d-flex">
          <h2 className="text-white py-2">Space X Api</h2>
          <div className="ml-auto d-flex">
            <div className="pr-3">
              <Button onClick={() => history.push(routeTemplates.auth.login)}>Login</Button>
            </div>
            <div>
              <Button onClick={() => history.push(routeTemplates.auth.signup)}>Signup</Button>
            </div>
          </div>
        </div>
      </Header>
      {children}
    </Layout>
  );
};

export default withRouter(AppLayout);
