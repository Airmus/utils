import isType from '..'

/** isType */

describe('isType', () => {

  it('without second input', () => {
    expect(isType(123)).toBe(false)
  })

  it('with second input', () => {
    expect(isType(undefined, 'undefined')).toBe(true)
  })

  it('illegal input', () => {
    expect(isType(undefined, 0 as any)).toBe(false)
  })

  it('string input', () => {
    expect(isType('sss', 'string')).toBe(true)
  })

  it('number input', () => {
    expect(isType(123, 'number')).toBe(true)
  })

  it('object input', () => {
    expect(isType({}, 'object')).toBe(true)
  })

  it('dom input', () => {
    expect(isType(document.createElement('ul'), 'dom')).toBe(true)
  })

  it('set input', () => {
    expect(isType(new Set(), 'array')).toBe(false)
  })

  it('array input', () => {
    expect(isType([], 'array')).toBe(true)
  })

  it('array input', () => {
    expect(isType([], 'object')).toBe(false)
  })

  it('symbol input', () => {
    expect(isType(Symbol('a'), 'symbol')).toBe(true)
  })

  it('bigint input', () => {
    expect(isType(BigInt(123456789), 'bigint')).toBe(true)
  })

  it('function input', () => {
    expect(isType(() => { }, 'function', 'object')).toBe(true)
  })

  it('promise input', () => {
    expect(isType(Promise.resolve(), 'promise')).toBe(true)
  })

  it('date input', () => {
    expect(isType(new Date(), 'function', 'object')).toBe(false)
  })

  it('multiple types input', () => {
    expect(isType(new Date(), 'string', 'date', 'null', 'object')).toBe(true)
  })

})


