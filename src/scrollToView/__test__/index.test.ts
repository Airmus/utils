import scrollToView from '..'

/** scrollToView */

describe('scrollToView', () => {
  const getBoundingClientRectMock = jest.spyOn(
    HTMLHeadingElement.prototype,
    'getBoundingClientRect',
  )
  const getClientRectsMock = jest.spyOn(HTMLHeadingElement.prototype, 'getClientRects')

  beforeAll(() => {
    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect)
    getClientRectsMock.mockReturnValue({ length: 1 } as DOMRectList)
  })

  afterAll(() => {
    getBoundingClientRectMock.mockRestore()
    getClientRectsMock.mockRestore()
  })

  it('no input', () => {
    expect(() => scrollToView({})).toThrow('Did you forget params selector?')
    expect(document.documentElement.scrollTop).toBe(0)
  })

  // it('with anchor', () => {
  //   expect(() => scrollToView({})).toThrow('Did you forget params selector?')
  // })

  // it('with selector and offset', () => {
  //   expect(() => scrollToView({})).toThrow('Did you forget params selector?')
  // })
})


