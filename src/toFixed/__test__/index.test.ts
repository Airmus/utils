import { expect, test } from 'vitest'
import toFixed from '..'

/** toFixed */

test('toFixed', () => {
  test('with digits', () => {
    expect(toFixed('123', {
      digits: 7,
    })).toBe('123.0000000')
  })

  test('without digits', () => {
    expect(toFixed(-123.9876)).toBe('-123.9876')
  })

  test('with rounding', () => {
    expect(toFixed(-123.9876, { rounding: true, digits: 3 })).toBe('-123.988')
  })

  test('illegal input', () => {
    expect(toFixed(null as any)).toBe('null')
    expect(toFixed(undefined as any, { rounding: true, digits: 3 })).toBe('undefined')
    expect(toFixed({} as any)).toBe('[object Object]')
  })

  test('digits equal zero', () => {
    expect(toFixed(123, { digits: 0 })).toBe('123')
  })
})
