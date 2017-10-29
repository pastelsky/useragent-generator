import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('ie user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.ie.windowsPhone(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IEMobile', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows Phone OS', version: '8.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '6.0.0' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.ie.windowsPhone('10.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IEMobile', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows Phone OS', version: '8.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '6.0.0' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.ie.windowsPhone({
      version: '8.0.0',
      device: Device.LUMIA_630,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IEMobile', version: '8.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows Phone OS', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '4.0.0' })
  })
})