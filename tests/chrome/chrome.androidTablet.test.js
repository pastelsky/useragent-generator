import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('chrome android tablet user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome.androidTablet(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '50.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel C', type: 'tablet', vendor: 'Google' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome.androidTablet('62.1.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel C', type: 'tablet', vendor: 'Google' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome.androidTablet({
      version: '62.1.1',
      androidVersion: '6.0.0',
      device: Device.SAMSUNG_TAB_3,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.1.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '6.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'SM-T210', type: 'tablet', vendor: 'Samsung' })
  })

  it('maps to closest webkit version', () => {
    const ua = makeUA.chrome.androidTablet('18.1.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '18.1.1.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '535.19.0' })
  })
})