import makeUA from '../../lib/index'
import OS from '../../constants/os'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('safari ios user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.safari.iOS(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Mobile Safari', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '602.1.50' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.safari.iOS('10.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Mobile Safari', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '602.1.50' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.safari.iOS({
      iOSVersion: '11.0.0',
      safariVersion: '11.1.0',
      device: Device.IPAD,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Mobile Safari', version: '11.1.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '11.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '604.1.28' })
  })
})