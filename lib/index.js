const Heroku = require('heroku-client');
const Dotenv = require('dotenv');

Dotenv.config();

const action = process.argv[2];
const heroku = new Heroku({ token: process.env.MY_HEROKU_API_TOKEN });

const APP_NAME = process.env.MY_HEROKU_APP_NAME;
const DYNO_TYPE = process.env.MY_HEROKU_DYNO_TYPE;

const scale = async () => {
  try {
    let body;

    if (action === 'up') {
      body = { quantity: process.env.MY_HEROKU_WEB_HIGH };
    } else if (action === 'down') {
      body = { quantity: process.env.MY_HEROKU_WEB_LOW };
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
