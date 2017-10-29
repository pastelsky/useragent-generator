import makeUA from '../../lib/index'
import UAParser from 'ua-parser-js'
import OS from '../../constants/os'

describe('firefox user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.firefox(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.firefox('50.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
  })

  it('works for versions below 30', () => {
    const ua = makeUA.firefox('24.0.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '24.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.firefox({
      version: '45.1',
      os: OS.WINDOWS_8_1,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '45.1.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '8.1' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
  })
})