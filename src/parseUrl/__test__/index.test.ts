import { parseUrl } from '..'

/** parseUrl */

describe('parseUrl', () => {

  it('normal', () => {
    expect(parseUrl('a=1&b=2&c=3')).toEqual({
      a: '1',
      b: '2',
      c: '3'
    })
  })

  it('with ？', () => {
    expect(parseUrl('https://fog3211.com?a=1&b=2&c=3')).toEqual({
      a: '1',
      b: '2',
      c: '3'
    })
  })

  it('with identical params', () => {
    expect(parseUrl('https://fog3211.com?a=1&a=2&A=3')).toEqual({
      a: ['1', '2'],
      A: '3'
    })
  })

  it('illegal input', () => {
    expect(parseUrl('')).toEqual({})
    expect(parseUrl(null as any)).toEqual({})
    expect(parseUrl(undefined as any)).toEqual({})
    expect(parseUrl(Promise.resolve('1') as any)).toEqual({})
  })

})


