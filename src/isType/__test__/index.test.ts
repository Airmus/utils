import { expect, test } from 'vitest'
import { isType } from '..'

/** isType */

test('isType', () => {
  test('without second input', () => {
    expect(isType(123)).toBe(false)
  })

  test('with second input', () => {
    expect(isType(undefined, 'undefined')).toBe(true)
  })

  test('illegal input', () => {
    expect(isType(undefined, 0 as any)).toBe(false)
  })

  test('string input', () => {
    expect(isType('sss', 'string')).toBe(true)
  })

  test('number input', () => {
    expect(isType(123, 'number')).toBe(true)
  })

  test('object input', () => {
    expect(isType({}, 'object')).toBe(true)
  })

  test('dom input', () => {
    expect(isType(document.createElement('ul'), 'dom')).toBe(true)
  })

  test('set input', () => {
    expect(isType(new Set(), 'array')).toBe(false)
  })

  test('array input', () => {
    expect(isType([], 'array')).toBe(true)
  })

  test('array input', () => {
    expect(isType([], 'object')).toBe(false)
  })

  test('symbol input', () => {
    expect(isType(Symbol('a'), 'symbol')).toBe(true)
  })

  test('bigint input', () => {
    expect(isType(BigInt(123456789), 'bigint')).toBe(true)
  })

  test('function input', () => {
    expect(isType(() => { }, 'function', 'object')).toBe(true)
  })

  test('promise input', () => {
    expect(isType(Promise.resolve(), 'promise')).toBe(true)
  })

  test('date input', () => {
    expect(isType(new Date(), 'function', 'object')).toBe(false)
  })

  test('multiple types input', () => {
    expect(isType(new Date(), 'string', 'date', 'null', 'object')).toBe(true)
  })
})
