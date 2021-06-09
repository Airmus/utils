import { toFixed } from '../src';

/** toFixed */

describe('toFixed: with digits', () => {
  it('works', () => {
    expect(toFixed('123', {
      digits: 7
    })).toBe('123.0000000')
  })
})

describe('toFixed: without digits', () => {
  it('works', () => {
    expect(toFixed(-123.9876)).toBe('-123.9876')
  })
})

describe('toFixed: with rounding', () => {
  it('works', () => {
    expect(toFixed(-123.9876, { rounding: true, digits: 3 })).toBe('-123.988')
  })
})

describe('toFixed: illegal input', () => {
  it('works', () => {
    expect(toFixed(null as any)).toBe('null')
    expect(toFixed(undefined as any, { rounding: true, digits: 3 })).toBe('undefined')
    expect(toFixed({} as any)).toBe('[object Object]')
  })
})
