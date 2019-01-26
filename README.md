# Dynosched

| Develop  | Master |
| ------------- | ------------- |
| [![Build Status](https://travis-ci.org/afgallo/dynosched.svg?branch=develop)](https://travis-ci.org/afgallo/dynosched)  | [![Build Status](https://travis-ci.org/afgallo/dynosched.svg?branch=master)](https://travis-ci.org/afgallo/dynosched)  |

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7b0160384dfb42529060c2cc2cd5833e)](https://app.codacy.com/app/afgallo/dynosched?utm_source=github.com&utm_medium=referral&utm_content=afgallo/dynosched&utm_campaign=Badge_Grade_Dashboard)
[![Coverage Status](https://coveralls.io/repos/github/afgallo/dynosched/badge.svg)](https://coveralls.io/github/afgallo/dynosched)

This script uses the Heroku Platform API to scale Dyno formation up or down. All you need to do is to schedule jobs using the Heroku Scheduler (free!) and set up env variables. Really handy to keep costs to a minimum (e.g. turn off my dyno at 8 pm and back on again at 7 am next day).

Enjoy!
