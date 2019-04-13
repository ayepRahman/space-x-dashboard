import React from 'react';
import { Row, Col } from 'antd';

import LoginUser from 'ui/graphql/LoginUser';
import { Link } from 'react-router-dom';
import routeTemplates from 'ui/routes/templates';

const Login = () => {
  return (
    <div>
      <Row className="pt-5">
        <Col span={12} offset={6}>
          <h3 className="text-center">Login</h3>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={6}>
          <LoginUser />
          <div className="pt-3">
            Not a user? <Link to={routeTemplates.auth.signup}>Sign up</Link> now!
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
