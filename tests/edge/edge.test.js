import makeUA from '../../lib/index'
import OS from '../../constants/os'
import useragent from 'useragent'

describe('edge user agent generator', () => {
  it('accepts simple number input', () => {
    const ua = makeUA.edge(12)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Edge 12.0.0')
    expect(agent.os.family).toBe('Windows 10')
  })

  it('accepts simple string input', () => {
    const ua = makeUA.edge('15.0.4')
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Edge 15.0.0')
    expect(agent.os.family).toBe('Windows 10')
  })

  it('accepts complex object', () => {
    const ua = makeUA.edge({
      chromeVersion: '62.0.1',
      version: '13.0.0',
      os: OS.WINDOWS_7,
    })
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Edge 13.0.0')
    expect(agent.os.family).toBe('Windows 7')
  })
})