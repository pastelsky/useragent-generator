import makeUA from '../../lib/index'
import useragent from 'useragent'

describe('bots user agent generator', () => {
  it('generates google bot with default version', () => {
    const ua = makeUA.googleBot()
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Googlebot 2.1.0')
  })

  it('generates google bot with given number version', () => {
    const ua = makeUA.googleBot(2)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Googlebot 2.0.0')
  })

  it('generates google bot with given string version', () => {
    const ua = makeUA.googleBot('2.1.1')
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('Googlebot 2.1.1')
  })

  it('generates bing bot with default version', () => {
    const ua = makeUA.bingBot()
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('bingbot 2.0.0')
  })

  it('generates bing bot with given number version', () => {
    const ua = makeUA.bingBot(2)
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('bingbot 2.0.0')
  })

  it('generates bing bot with given string version', () => {
    const ua = makeUA.bingBot('2.1.1')
    const agent = useragent.parse(ua)

    expect(agent.toAgent()).toBe('bingbot 2.1.1')
  })


  it('generates yahoo bot', () => {
    const ua = makeUA.yahooBot()
    const agent = useragent.parse(ua)

    expect(agent.family).toBe('Yahoo! Slurp')
  })
})