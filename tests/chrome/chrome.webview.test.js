import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'
import useragent from 'useragent'

describe('chrome webview user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome.androidWebview(4)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser)
      .toMatchObject({ name: 'Android Browser', version: '4.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '4.0.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '534.30.0' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel', type: 'mobile', vendor: 'Google' })
  })

  // `ua-parser-js` does not detect android version correctly for
  // these versions, so we use `useragent` to get around this
  it('works for android versions between kitkat and marshmallow', () => {
    const ua = makeUA.chrome.androidWebview(5)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Chrome Mobile 60.0.0')
    expect(agent.os.toString()).toBe('Android 5.0.0')
    expect(agent.device.family).toBe('Pixel')
  })

  // `ua-parser-js` does not detect android version correctly for
  // these versions, so we use `useragent` to get around this
  it('works for android versions above marshmallow', () => {
    const ua = makeUA.chrome.androidWebview(6.1)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Chrome Mobile WebView 60.0.0')
    expect(agent.os.toString()).toBe('Android 6.1.0')
    expect(agent.device.family).toBe('Pixel')
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome.androidWebview('7.1.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser)
      .toMatchObject({ name: 'Chrome WebView', version: '60.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.1.1' })
    expect(agent.device)
      .toMatchObject({ model: 'Pixel', type: 'mobile', vendor: 'Google' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome.androidWebview({
      androidVersion: '7.1.1',
      chromeVersion: '62.1.0',
      device: Device.NEXUS_6,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser)
      .toMatchObject({ name: 'Chrome WebView', version: '62.1.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.1.1' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36' })
    expect(agent.device)
      .toMatchObject({ model: 'Nexus 6', type: 'mobile', vendor: 'Motorola' })
  })
})