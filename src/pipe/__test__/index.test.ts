import pipe from '..';
import { expect, test } from 'vitest'

/** pipe */

test('pipe', () => {
  test('normal input', () => {
    const fun1 = (x: number) => x + 2
    const fun2 = (x: number) => x * 5
    const fun3 = (x: number) => x.toString() + '...'

    expect(pipe(10, fun1, fun2, fun3)).toBe('60...')
    expect(pipe(20, fun2, fun1, fun3)).toBe('102...')

  })
})
