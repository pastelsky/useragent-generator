import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('firefox android tablet user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.firefox.androidTablet(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'tablet' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.firefox.androidTablet('50.0.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.1' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'tablet' })
  })

  it('works for firefox versions below 41', () => {
    const ua = makeUA.firefox.androidTablet('32.0.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '32.0.1' })
    // Versions below 41 did not have a field for android version
    expect(agent.os).toMatchObject({ name: 'Android', version: undefined })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'tablet' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.firefox.androidTablet({
      version: '52.1.1',
      androidVersion: '6.0.0',
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '52.1.1' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '6.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'tablet' })
  })
})