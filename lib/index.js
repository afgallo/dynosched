const Heroku = require('heroku-client')
const moment = require('moment-timezone')

const scale = async (now = moment()) => {
  const {
    MY_HEROKU_API_TOKEN,
    APP_NAME,
    DYNO_TYPE = 'web',
    WEB_HIGH = 1,
    WEB_LOW = 0,
    SCALE_DOWN_AT = 19,
    TZ = 'Australia/Sydney'
  } = process.env

  if (!MY_HEROKU_API_TOKEN) {
    console.log('No api token provided. Not running.')
    return 1
  }

  if (!APP_NAME || !DYNO_TYPE) {
    console.log('No app name or dyno type provided. Not running.')
    return 1
  }

  let action = 'up'
  const today = now.tz(TZ)

  console.log('Today is', today.format('LLLL'))

  if (today.day() === 0 || today.day() === 6) { // weekend
    action = 'down'
  }

  if (today.hour() >= SCALE_DOWN_AT) {
    action = 'down'
  }

  try {
    const heroku = new Heroku({ token: MY_HEROKU_API_TOKEN })
    const body = action === 'up' ? { quantity: WEB_HIGH } : { quantity: WEB_LOW }
    const url = `/apps/${APP_NAME}/formation/${DYNO_TYPE}`

    await heroku.patch(url, { body })

    console.log(`Dyno formation scaled ${action} successfully!`)
    return action
  } catch (e) {
    console.log('ERROR scaling dyno formation', e)
    return 1
  }
}

module.exports = { scale }
