/* eslint-disable react/function-component-definition */
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import { useMediaQuery } from '../../misc/custom-hooks';
import Chat from './Chat';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { isExact } = useRouteMatch();
  const canRenderSidebar = isDesktop || isExact;
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={6} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col className="h-100">
                <Chat xs={24} md={18} className="h-100" />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={18} className=" h-100">
                  <h6 className="text-center mt-page">Please Select a room.</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
