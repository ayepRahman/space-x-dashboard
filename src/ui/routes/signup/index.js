import React from 'react';
import { Row, Col } from 'antd';

import SignUpUser from 'ui/graphql/SignUpUser';

const Signup = () => {
  return (
    <div>
      <Row className="pt-5">
        <Col span={12} offset={6}>
          <h3 className="text-center">Signup</h3>
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
