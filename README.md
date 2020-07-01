# Dynosched

[![Build Status](https://travis-ci.org/afgallo/dynosched.svg?branch=master)](https://travis-ci.org/afgallo/dynosched) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/7b0160384dfb42529060c2cc2cd5833e)](https://app.codacy.com/app/afgallo/dynosched?utm_source=github.com&utm_medium=referral&utm_content=afgallo/dynosched&utm_campaign=Badge_Grade_Dashboard) [![Coverage Status](https://coveralls.io/repos/github/afgallo/dynosched/badge.svg)](https://coveralls.io/github/afgallo/dynosched)

This script uses the Heroku Platform API to scale your Dyno formation up or down. All you need to do is to schedule jobs using the Heroku Scheduler (free!) and set up some env variables.
Really handy to keep costs to a minimum (e.g. turn off my dyno at 8 pm and back on again at 7 am next day).

## Instructions

### 1. Set the env variables below using `heroku config:set MY_HEROKU_API_TOKEN=***`

```
MY_HEROKU_API_TOKEN=****
APP_NAME=my-app-name
DYNO_TYPE=web
WEB_HIGH=1 // maximum number of processes
WEB_LOW=0 // minimum number of processes
SCALE_DOWN_AT=19 // the hour to scale down your dyno formation in your timezone
TZ='Australia/Sydney'
```

### 2. Configure the heroku scheduler add-on to run `dynosched`
https://devcenter.heroku.com/articles/scheduler


Enjoy!
