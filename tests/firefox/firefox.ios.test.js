import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('firefox iOS user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.firefox.iOS(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '1.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.0.0' })
    expect(agent.device)
      .toMatchObject({ model: 'iPhone', type: 'mobile', vendor: 'Apple' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.firefox.iOS('10.3.0')
    const agent = parser.setUA(ua).getResult()
    console.log(ua)

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '1.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.3.0' })
    expect(agent.device)
      .toMatchObject({ model: 'iPhone', type: 'mobile', vendor: 'Apple' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.firefox.iOS({
      iOSVersion: '10.3.0',
      device: Device.IPAD,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '1.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.3.0' })
    expect(agent.device)
      .toMatchObject({ model: 'iPad', type: 'tablet', vendor: 'Apple' })
  })
})