import React from 'react';
import { Row, Col } from 'antd';

const Login = () => {
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <h1 className="text-center">Login</h1>
        </Col>
      </Row>
      <Row />
    </div>
  );
};

export default Login;
