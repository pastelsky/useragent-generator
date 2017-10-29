import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('chrome android phone user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome.androidPhone(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '50.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel', type: 'mobile', vendor: 'Google' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome.androidPhone('62.1.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel', type: 'mobile', vendor: 'Google' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome.androidPhone({
      version: '62.1.1',
      androidVersion: '6.0.0',
      device: Device.NEXUS_6,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.1.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '6.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Nexus 6', type: 'mobile', vendor: 'Motorola' })
  })

  it('maps to closest webkit version', () => {
    const ua = makeUA.chrome.androidPhone('18.1.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '18.1.1.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '535.19.0' })
  })
})