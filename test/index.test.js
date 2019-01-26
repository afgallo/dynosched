const Heroku = require('heroku-client')
const moment = require('moment')
const { scale } = require('../lib')

const setEnvVariables = () => {
  process.env.MY_HEROKU_API_TOKEN = 'some_token'
  process.env.APP_NAME = 'app'
}

jest.mock('heroku-client')

beforeEach(() => {
  Heroku.mockClear()
})

describe('Dynosched', () => {
  it('Doesn\'t run without an api token', () => {
    expect(scale()).resolves.toEqual(1)
  })

  it('Doesn\'t run without an app name', () => {
    process.env.MY_HEROKU_API_TOKEN = 'some_token'
    expect(scale()).resolves.toEqual(1)
  })

  it('it scales up on a Monday morning', () => {
    setEnvVariables()
    const monday = moment().endOf('month').startOf('isoweek')

    expect(scale(monday)).resolves.toEqual('up')
    expect(Heroku).toHaveBeenCalledTimes(1)
  })

  it('it scales up on a Tuesday 7:00', () => {
    setEnvVariables()
    const tuesday = moment().startOf('month').isoWeekday(2).set({ hour: '07' })

    expect(scale(tuesday)).resolves.toEqual('up')
    expect(Heroku).toHaveBeenCalledTimes(1)
  })

  it('it scales down on a Tuesday 19:00', () => {
    setEnvVariables()
    const tuesday = moment().startOf('month').isoWeekday(2).set({ hour: '19' })

    expect(scale(tuesday)).resolves.toEqual('down')
    expect(Heroku).toHaveBeenCalledTimes(1)
  })

  it('it scales down on a Saturday', () => {
    setEnvVariables()
    const tuesday = moment().startOf('month').isoWeekday(6)

    expect(scale(tuesday)).resolves.toEqual('down')
    expect(Heroku).toHaveBeenCalledTimes(1)
  })

  it('it scales down on a Sunday', () => {
    setEnvVariables()
    const tuesday = moment().startOf('month').isoWeekday(7)

    expect(scale(tuesday)).resolves.toEqual('down')
    expect(Heroku).toHaveBeenCalledTimes(1)
  })

  it('it doesn\'t do anything if heroku api errors out', () => {
    setEnvVariables()

    Heroku.mockImplementation(() => {
      throw new Error()
    })

    expect(scale()).resolves.toEqual(1)
    expect(Heroku).toHaveBeenCalledTimes(1)
  })
})
