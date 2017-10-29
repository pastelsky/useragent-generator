import makeUA from '../../lib/index'
import OS from '../../constants/os'
import UAParser from 'ua-parser-js'

describe('safari user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.safari(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Safari', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'Mac OS', version: '10.12' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '602.1.50' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.safari('10.1.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Safari', version: '10.1.0' })
    expect(agent.os).toMatchObject({ name: 'Mac OS', version: '10.12' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '603.1.30' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.safari({
      version: '11.0.0',
      os: OS.MAC_OSX_10_11,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Safari', version: '11.0.0' })
    expect(agent.os).toMatchObject({ name: 'Mac OS', version: '10.11' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '604.1.28' })
  })
})