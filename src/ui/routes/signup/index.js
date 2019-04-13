import React from 'react';
import { Row, Col } from 'antd';

import SignUpUser from 'ui/graphql/SignUpUser';
import { Link } from 'react-router-dom';
import routeTemplates from 'ui/routes/templates';

const Signup = () => {
  return (
    <div>
      <Row className="pt-5">
        <Col span={12} offset={6}>
          <h3 className="text-center">Sign up</h3>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={6}>
          <SignUpUser />
          <div className="pt-3">
            Already a user? <Link to={routeTemplates.auth.login}>Login</Link> instead.
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
