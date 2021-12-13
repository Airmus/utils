import uuid from '../index'

/** uuid */

describe('uuid', () => {
  window.URL.createObjectURL = function () { return '3c29bf9c-5808-4d8d-a6d2-c6f5b3990299' }

  it('normal', () => {
    expect(uuid()).toHaveLength(36)
    expect(uuid()).toMatch(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)
  })
})
