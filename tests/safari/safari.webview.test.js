import makeUA from '../../lib/index'
import Device from '../../constants/device'
import useragent from 'useragent'

describe('safari webview user agent generator', () => {
  it('accepts simple number input', () => {
    const ua = makeUA.safari.iOSWebview(10)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Mobile Safari UI/WKWebView 10.0.0')
    expect(agent.os.toString()).toBe('iOS 10.0.0')
    expect(agent.device.family).toBe('iPhone')
  })

  it('accepts simple number input', () => {
    const ua = makeUA.safari.iOSWebview('10.0.1')
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Mobile Safari UI/WKWebView 10.0.1')
    expect(agent.os.toString()).toBe('iOS 10.0.1')
    expect(agent.device.family).toBe('iPhone')
  })

  it('accepts complex object', () => {
    const ua = makeUA.safari.iOSWebview({
      iOSVersion: '10.0.0',
      safariVersion: '10.1.1',
      device: Device.IPAD,
    })
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Mobile Safari UI/WKWebView 10.1.1')
    expect(agent.os.toString()).toBe('iOS 10.0.0')
    expect(agent.device.family).toBe('iPad')
  })
})