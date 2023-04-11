import { linkCalculator } from '..'

/** linkCalculator */

describe('linkCalculator', () => {

  it('normal input', () => {
    expect(linkCalculator(121).add(1).minus(2).multi(3).div(4)).toBe(90)
  })
})


