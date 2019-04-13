import React from 'react';
import { Row, Col } from 'antd';

import SignUpUser from 'ui/graphql/SignUpUser';

const Signup = () => {
  return (
    <div>
      <Row className="pt-3">
        <Col span={12} offset={6}>
          <h1 className="text-center">Signup</h1>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={6}>
          <SignUpUser />
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
