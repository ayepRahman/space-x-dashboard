import React from 'react';
import { Row, Col } from 'antd';

import LaunchPastList from 'ui/graphql/LaunchPastList';

const Dashboard = () => {
  return (
    <div className="py-5">
      <Row>
        <Col className="text-center">
          <h2>Past Launches</h2>
        </Col>
      </Row>
      <Row justify="center" type="flex">
        <Col xs={16} className="text-center">
          <LaunchPastList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
