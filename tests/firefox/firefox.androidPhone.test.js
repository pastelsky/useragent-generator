import makeUA from '../../lib/index'
import Device from '../../constants/device'
import UAParser from 'ua-parser-js'

describe('firefox android phone user agent generator', () => {
  let parser = new UAParser()

  it('accepts simple number input', () => {
    const ua = makeUA.firefox.androidPhone(50)
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.0' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'mobile' })
  })

  it('accepts simple string input', () => {
    const ua = makeUA.firefox.androidPhone('50.0.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '50.0.1' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '7.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'mobile' })
  })

  it('works for firefox versions below 41', () => {
    const ua = makeUA.firefox.androidPhone('32.0.1')
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '32.0.1' })
    // Versions below 41 did not have a field for android version
    expect(agent.os).toMatchObject({ name: 'Android', version: undefined })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'mobile' })
  })

  it('accepts complex object', () => {
    const ua = makeUA.firefox.androidPhone({
      version: '52.1.1',
      androidVersion: '6.0.0',
    })
    const agent = parser.setUA(ua).getResult()

    expect(agent.browser).toMatchObject({ name: 'Firefox', version: '52.1.1' })
    expect(agent.os).toMatchObject({ name: 'Android', version: '6.0.0' })
    expect(agent.engine).toMatchObject({ name: 'Gecko' })
    expect(agent.device).toMatchObject({ type: 'mobile' })
  })
})