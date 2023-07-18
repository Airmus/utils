import { expect, test } from 'vitest'
import { BidirectionalMap } from '..'

test('BidirectionalMap', () => {
  test('should set and get values correctly', () => {
    const map = new BidirectionalMap<string, number>({})
    map.set('one', 1)
    map.set('two', 2)
    map.set('three', 3)

    expect(map.get('one')).toBe(1)
    expect(map.get('two')).toBe(2)
    expect(map.get('three')).toBe(3)
    expect(map.getKey(1)).toBe('one')
    expect(map.getKey(2)).toBe('two')
    expect(map.getKey(3)).toBe('three')
  })

  test('should delete values correctly', () => {
    const map = new BidirectionalMap<string, number>({})
    map.set('one', 1)
    map.set('two', 2)
    map.set('three', 3)

    map.delete('two')
    expect(map.has('two')).toBe(false)
    expect(map.getKey(2)).toBe(undefined)

    map.deleteValue(3)
    expect(map.hasValue(3)).toBe(false)
    expect(map.get('three')).toBe(undefined)
  })

  test('should clear values correctly', () => {
    const map = new BidirectionalMap<string, number>(null as any)
    map.set('one', 1)
    map.set('two', 2)
    map.set('three', 3)

    map.clear()
    expect(map.size).toBe(0)
    expect(map.has('one')).toBe(false)
    expect(map.has('two')).toBe(false)
    expect(map.has('three')).toBe(false)
    expect(map.hasValue(1)).toBe(false)
    expect(map.hasValue(2)).toBe(false)
    expect(map.hasValue(3)).toBe(false)
  })
})
