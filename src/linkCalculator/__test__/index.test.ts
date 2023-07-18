import { expect, test } from 'vitest'
import { linkCalculator } from '..'

/** linkCalculator */

test('linkCalculator', () => {
  test('normal input', () => {
    expect(linkCalculator(121).add(1).minus(2).multi(3).div(4)).toBe(90)
  })
})
