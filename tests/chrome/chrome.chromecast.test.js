import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('chrome chromecast user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome.chromecast(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '50.0.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36' })
    expect(agent.device)
      .toMatchObject({ model: 'Chromecast', vendor: 'Google' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome.chromecast('62.1.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.0.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Chromecast', vendor: 'Google' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome.chromecast({ version: '62.1.1' })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.1.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Chromecast', vendor: 'Google' })
  })
})