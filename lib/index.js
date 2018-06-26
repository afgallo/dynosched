const Heroku = require('heroku-client');
const Dotenv = require('dotenv');

Dotenv.config();

const action = process.argv[2];
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });

const APP_NAME = process.env.HEROKU_APP_NAME || 'sprout-api-dev';
const DYNO_TYPE = process.env.HEROKU_DYNO_TYPE || 'web';

const scale = async () => {
  try {
    let body;

    if (action === 'up') {
      body = { quantity: process.env.HEROKU_WEB_HIGH };
    } else if (action === 'down') {
      body = { quantity: process.env.HEROKU_WEB_LOW };
    }

    await heroku.patch(`/apps/${APP_NAME}/formation/${DYNO_TYPE}`, { body });

    console.log(`Dyno formation scaled ${action} successfully!`);
    process.exit(0);
  } catch (e) {
    console.log('ERROR scaling dyno formation', e);
    process.exit(0);
  }
};

scale();
