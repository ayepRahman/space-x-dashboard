import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import SpaceXAnimationLogo from 'ui/components/Animators/SpaceXAnimationLogo';

const Home = ({ history }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Row style={{ height: '50%' }} type="flex" justify="space-around" align="middle">
        <Col>
          <div>
            <SpaceXAnimationLogo />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Home);
