import { numberParse, numberMatch } from '../index';
import { expect, test } from 'vitest'

/** numberParse */

test('numberParse', () => {
  test('format to string int', () => {
    expect(numberParse('qqq11.22.3--dd9.0', {
      format: 'STRING_INT'
    })).toBe('11')
  })

  test('use digits', () => {
    expect(numberParse('e-7.344ohj94^ku6!b0du', {
      format: 'NUMBER_FLOAT',
      digits: 2
    })).toBeCloseTo(-7.34)
  })

  test('format to string float', () => {
    expect(numberParse(')js-.-22.3-NJJ0.k', {
      format: 'STRING_FLOAT'
    })).toBe('-22.3')
  })

  test('format to number int', () => {
    expect(numberParse('"sss>+99.88-33.a9).eee"', {
      format: 'NUMBER_INT'
    })).toBe(99)
  })

  test('use customRegexp', () => {
    expect(numberParse('as9jsadj"sss33.a9).eee"', {
      customRegexp: /([1-5]+)/g
    })).toBe("33")
  })

  test('use customRegexp but not match', () => {
    expect(numberParse('99', {
      customRegexp: /([1-7]+)/g
    })).toBeUndefined()
  })

  test('use customRegexp and input is empty', () => {
    expect(numberParse('')).toBeUndefined()
  })
})


/** numberMatch */

test('numberMatch', () => {
  test('format to number float and has rounding digits', () => {
    expect(numberMatch('11,2233.52288880wqjeio-90.79809-33', {
      format: 'NUMBER_FLOAT',
      digits: 3
    })).toEqual([11, 2233.522, -90.798, -33])
  })

  test('only match float which less than zero', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90.79809-33', {
      format: 'NUMBER_FLOAT',
      customRegexp: /-\d+(\.\d+)/g
    })).toEqual([-2233.522888, -90.79809])
  })

  test('format to string int', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90', {
      format: 'STRING_INT',
    })).toEqual(['-11', '-02233', '522888', '80', '-90'])
  })

  test('no input params', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90.79809-33'))
      .toEqual(['-11', '-02233.522888', '80', '-90.79809', '-33'])
  })

  test('no matchs', () => {
    expect(numberMatch(')'))
      .toEqual([])
  })
})
