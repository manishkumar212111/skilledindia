'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../si/Layout';
// import IndexPage from '../pt/pages/IndexPage';
import { routesConfigs,asyncLoad } from '.';

if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require) }

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute 
      pathname="home"
      getComponent={(location, callback) => {
          require.ensure([], require => {
              callback(null, require('../si/pages/IndexPage').default)
          }, 'IndexPage')
      }}
    />
    
    {(routesConfigs).map((p, index) =>
      <Route
          key={index}
          pathname={p.name}
          path={p.path}
          getComponent={(location, callback) => {
            asyncLoad(p.component , callback)
          }}
          // {...setComponentProps(p.component)}
      />
    )};
  </Route>
);

export default routes;
