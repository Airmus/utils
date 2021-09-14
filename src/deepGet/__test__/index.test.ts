import deepGet from '..'

/** deepGet */

describe('deepGet', () => {

  it('normal input', () => {
    expect(deepGet({ a: 1 }, 'a')).toBe(1)
  })

  it('illegal target', () => {
    expect(deepGet(11 as any, 'a')).toBe(11)
  })

  it('illegal path', () => {
    expect(deepGet([1, 2, 3], 222 as any)).toBe(undefined)
  })

  it('nested object array', () => {
    expect(deepGet({ a: { b: [1, 2, { c: new Map() }] } }, 'a.b.2.c')).toEqual(new Map())
  })

  it('nested object array with array', () => {
    expect(deepGet({ a: { b: [1, 2, { c: new Date() }] } }, ['a', 'b', 2, 'c'])).toEqual(new Date())
  })

  it('default value', () => {
    expect(deepGet({ a: { b: [1, 2, { c: new Date() }] } }, 'c.b.a', 'none')).toBe('none')
  })

  it('target is array', () => {
    expect(deepGet([1, 2, 3, { a: 33 }], '3.a', 'none')).toBe(33)
  })

  it('string path contain .', () => {
    expect(deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, 'a.b.c')).toBe('s2')
  })

  it('array path to replace .', () => {
    expect(deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', 'b.c'])).toBe('s1')
  })

  it('array path contain empty key', () => {
    expect(
      deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', null, 'aaa'] as any, 's3')
    ).toBe('s3')
  })
})


