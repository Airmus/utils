import { expect, test } from 'vitest'
import { ProStorage } from '../index'

/** ProStorage */

test('ProStorage', () => {
  test('normal input', () => {
    const proStorage = new ProStorage()
    expect(proStorage.local.get('aaa')).toBe('11')
  })
})
