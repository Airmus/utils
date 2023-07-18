import uniqueObjectArray from '..';
import { expect, test } from 'vitest'

/** uniqueObjectArray */

test('uniqueObjectArray', () => {
  test('illegal array', () => {
    expect(uniqueObjectArray({} as [], {})).toEqual([])
  })

  test('illegal array with some key', () => {
    expect(uniqueObjectArray({ a: 11 } as any, { key: 'a' })).toEqual([])
  })

  test('find value in object', () => {
    expect(uniqueObjectArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], {
      key: 'a'
    })).toStrictEqual([{ a: 1, b: 3 }])
  })

  test('not find value in object', () => {
    expect(uniqueObjectArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], {
      key: 'ss'
    })).toStrictEqual([{ a: 1, b: 2 }, { a: 1, b: 3 }])
  })

  test('without second options', () => {
    expect(uniqueObjectArray([{ a: '11' }, { a: 11 }])).toStrictEqual([{ a: '11' }, { a: 11 }])
  })
})
