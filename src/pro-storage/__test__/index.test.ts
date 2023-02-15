import { ProStorage } from '../index'

/** ProStorage */

describe('ProStorage', () => {
  it('normal input', () => {
    const proStorage = new ProStorage()
    expect(proStorage.local.get('aaa')).toBe('11')
  })
})
