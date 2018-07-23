import makeUA from '../../lib/index'
import OS from '../../constants/os'
import UAParser from 'ua-parser-js'

describe('chrome user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.chrome(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '50.0.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.chrome('62.1.0')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '10' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.chrome({
      version: '62.1.0',
      os: OS.WINDOWS_8_1,
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '62.1.0.0' })
    expect(agent.os).toMatchObject({ name: 'Windows', version: '8.1' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '537.36.0' })
  })

  it('maps to closest webkit version', () => {
    const ua = makeUA.chrome('18.1.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chrome', version: '18.1.1.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '535.19.0' })
  })


  it('can generate UA for chromium', () => {
    const ua = makeUA.chromium('18.1.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Chromium', version: '18.1.1.0' })
    expect(agent.engine).toMatchObject({ name: 'WebKit', version: '535.19.0' })
  })
})