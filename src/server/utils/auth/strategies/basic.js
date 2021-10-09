const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');

require('dotenv').config();

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      const { data, status, headers } = await axios({
        url: `${process.env.API_URL}/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN,
        },
      });

      const cookieElements = headers['set-cookie'][0].split('; ');
      const token = cookieElements.filter((e) => e.includes('token'))[0].split('=')[1];
      const expires = cookieElements.filter((e) => e.includes('Expires'))[0].split('=')[1];
      const maxAge = cookieElements.filter((e) => e.includes('Max-Age'))[0].split('=')[1];
      const path = cookieElements.filter((e) => e.includes('Path'))[0].split('=')[1];

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, { token, expires, maxAge, path, ...data });
    } catch (error) {
      cb(error);
    }
  }),
);
