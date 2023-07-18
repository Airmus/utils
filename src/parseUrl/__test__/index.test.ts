import { parseUrl } from '..'
import { expect, test } from 'vitest'

/** parseUrl */

test('parseUrl', () => {

  test('normal', () => {
    expect(parseUrl('a=1&b=f2&c=l3')).toEqual({
      a: 1,
      b: 'f2',
      c: 'l3'
    })
  })

  test('with ？', () => {
    expect(parseUrl('https://fog3211.com?a=-1&b=jjjj&c=3x')).toEqual({
      a: -1,
      b: 'jjjj',
      c: '3x'
    })
  })

  test('with identical params', () => {
    expect(parseUrl('https://fog3211.com?a=1&a=2&A=3')).toEqual({
      a: [1, 2],
      A: 3
    })
  })

  test('illegal input', () => {
    expect(parseUrl('')).toEqual({})
    expect(parseUrl(null as any)).toEqual({})
    expect(parseUrl(undefined as any)).toEqual({})
    expect(parseUrl(Promise.resolve('1') as any)).toEqual({})
  })

  test('encode url params', () => {
    expect(parseUrl('https://www.baidu.com/?eurl=https%3A%2F%2Fwww.baidu.com%2F&url=https://www.baidu.com/')).toEqual({
      eurl: 'https://www.baidu.com/',
      url: 'https://www.baidu.com/',
    })

  })

})


