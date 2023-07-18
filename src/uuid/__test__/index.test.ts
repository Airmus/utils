import uuid from '../index'
import { expect, test } from 'vitest'

/** uuid */

test('uuid', () => {
  globalThis.URL.createObjectURL = function () { return '3c29bf9c-5808-4d8d-a6d2-c6f5b3990299' }

  test('normal', () => {
    expect(uuid()).toHaveLength(36)
    expect(uuid()).toMatch(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)
  })
})
