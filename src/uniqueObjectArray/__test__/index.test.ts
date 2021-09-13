import uniqueObjectArray from '..';

/** uniqueObjectArray */

describe('uniqueObjectArray', () => {
  it('illegal array', () => {
    expect(uniqueObjectArray({} as [], {})).toEqual([])
  })

  it('illegal array with some key', () => {
    expect(uniqueObjectArray({ a: 11 } as any, { key: 'a' })).toEqual([])
  })

  it('find value in object', () => {
    expect(uniqueObjectArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], {
      key: 'a'
    })).toStrictEqual([{ a: 1, b: 3 }])
  })

  it('not find value in object', () => {
    expect(uniqueObjectArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], {
      key: 'ss'
    })).toStrictEqual([{ a: 1, b: 2 }, { a: 1, b: 3 }])
  })

  it('without second options', () => {
    expect(uniqueObjectArray([{ a: '11' }, { a: 11 }])).toStrictEqual([{ a: '11' }, { a: 11 }])
  })
})
