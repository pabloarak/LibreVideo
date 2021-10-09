import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import session from 'express-session';
import axios from 'axios';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import Layout from '../frontend/components/Layout';
import getManifest from './getManifest';

dotenv.config();

const app = express();
const { ENV, PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

require('./utils/auth/strategies/basic');

if(ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) {
      req.hashManifest = getManifest();
    }
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {

  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
        <title>Libre Video</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c'
    )}
        </script> 
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>
  `);
};

const renderApp = async (req, res) => {
  let initialState;
  const { token, email, name, id } = req.cookies;

  try {
    let movieList = await axios({
      url: `${process.env.API_URL}/movies`,
      headers: { Authorization: token },
      method: 'get',
    });
    movieList = movieList.data.data;
    initialState = {
      user: {
        id, email, name,
      },
      myList: [],
      trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie._id),
      originals: movieList.filter((movie) => movie.contentRating === 'G' && movie._id),
      searchVideo: [],
    };
  } catch (err) {
    initialState = {
      user: {},
      myList: [],
      trends: [],
      originals: [],
      searchVideo: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = (initialState.user.id);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          {renderRoutes(serverRoutes(isLogged))}
        </Layout>
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.post(
  '/auth/sign-in',
  (req, res, next) => {
    passport.authenticate('basic', (error, data) => {
      try {

        if (error || !data) {
          next(boom.unauthorized());
        }

        req.login(data, { session: false }, (err) => {
          if (err) {
            next(err);
          }

          const { token, expires, maxAge, path, ...user } = data;

          res.cookie('token', token, {
            httpOnly: !(ENV === 'development'),
            secure: !(ENV === 'development'),
            expires,
            maxAge,
            path,
          });

          res.status(200).json(user);
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  },
);

app.post(
  '/auth/sign-up',
  async (req, res, next) => {

    const { body: user } = req;

    try {
      const userData = await axios({
        url: `${process.env.API_URL}/auth/sign-up`,
        method: 'post',
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
        },
      });

      res.status(201).json({
        name: req.body.name,
        email: req.body.email,
        id: userData.data.id,
      });
    } catch (error) {
      next(error);
    }
  },
);

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if(err) 
    console.log(err);
  else
    console.log(`Server running on port ${PORT}`);
});