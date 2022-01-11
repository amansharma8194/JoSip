/* eslint-disable react/function-component-definition */
import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <Grid fluid className="h-100">
      <Row>
        <Col xs={24} md={6}>
          <Sidebar />
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
