import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('chrome iOS user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome.iOS(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '60.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '602.1.50' })
    expect(agent.device)
      .toMatchObject({ model: 'iPhone', type: 'mobile', vendor: 'Apple' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome.iOS('10.3.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '60.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.3.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '603.3.8' })
    expect(agent.device)
      .toMatchObject({ model: 'iPhone', type: 'mobile', vendor: 'Apple' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome.iOS({
      iOSVersion: '10.3.0',
      chromeVersion: '62.0.0',
      device: Device.IPAD,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'iOS', version: '10.3.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '603.3.8' })
    expect(agent.device)
      .toMatchObject({ model: 'iPad', type: 'tablet', vendor: 'Apple' })
  })

  it('maps to closest webkit version', () => {
    const ua = makeUA.chrome.iOS('9.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '601.1.56' })
  })
})