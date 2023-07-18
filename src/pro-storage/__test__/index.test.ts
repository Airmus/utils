import { ProStorage } from '../index'
import { expect, test } from 'vitest'

/** ProStorage */

test('ProStorage', () => {
  test('normal input', () => {
    const proStorage = new ProStorage()
    expect(proStorage.local.get('aaa')).toBe('11')
  })
})
