import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { Row, Col } from 'antd';

import routeTemplates from 'ui/routes/templates';

const { Header, Sider, Content, Footer } = Layout;

const Home = ({ history }) => {
  return (
    <div>
      <h1>Home la</h1>
    </div>
  );
};

export default withRouter(Home);
