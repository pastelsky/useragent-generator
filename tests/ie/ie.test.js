import makeUA from '../../lib/index'
import OS from '../../constants/os'
import UAParser from 'ua-parser-js'

describe('ie user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.ie(10)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IE', version: '10.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '6.0.0' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.ie('10.0.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IE', version: '10.0.1' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '6.0.0' })
  })

  it('works for versions equal to and above 11', () => {
    const ua = makeUA.ie('11.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IE', version: '11.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '8.1' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '7.0.0' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.ie({
      version: '9.0.0',
      os: OS.WINDOWS_7,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'IE', version: '9.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '7' })
    expect(agent.engine).toMatchObject({ name: 'Trident', version: '5.0.0' })
  })
})