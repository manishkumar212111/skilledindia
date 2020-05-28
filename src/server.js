'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes/routes';
import NotFoundPage from './si/pages/NotFoundPage';
import config from './si/configs/configs';
import PropTypes from 'prop-types';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

class DataProvider extends React.Component {
  getChildContext() {
      return {data: this.props.data };
  }
  render() {
      return <RouterContext {...this.props}/>;
  }
}

DataProvider.propTypes = {
  data: PropTypes.object
};

DataProvider.childContextTypes = {
  data: PropTypes.object
};

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }
      renderProps.serverCookie= JSON.stringify(req.headers.cookie);
      if(typeof renderProps.components[1].fetchData !== 'undefined'){
          renderProps.components[1].fetchData(renderProps , (data) => {
          let configs = data; 
          let markup;
          if(configs.status && configs.status === 302 && configs.url){
            return res.redirect(302, configs.url);
          }  
          // generate the React markup for the current route
          else if(configs.error){
              return res.redirect(302, config.baseUrl+'503');
          }
          else if (renderProps && !configs.error) {
            renderProps.data = configs;
            // if the current route matched we have renderProps
            markup = renderToString(<DataProvider  {...renderProps} data={configs} />);
            return res.render('index', { markup : markup , data : configs });

          } else {
            // otherwise we can render a 404 page
            markup = renderToString(<NotFoundPage />);
            res.status(404);
          }
          // render the index template with the embedded React markup
        
        });
      }
    }
  );
});

// start the server
const port = process.env.PORT || config.port;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on ${config.baseUrl}${port} [${env}]`);
});
