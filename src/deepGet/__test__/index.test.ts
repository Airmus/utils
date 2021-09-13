import deepGet from '..'

/** deepGet */

describe('deepGet', () => {

  it('without second input', () => {
    expect(deepGet({ a: 1 }, 'a')).toBe(1)
  })
})


