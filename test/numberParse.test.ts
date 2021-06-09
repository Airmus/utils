import { numberParse, numberMatch } from '../src';

/** numberParse */

describe('numberParse: format to string int', () => {
  it('works', () => {
    expect(numberParse('qqq11.22.3--dd9.0', {
      format: 'STRING_INT'
    })).toBe('11')
  })
})

describe('numberParse: use digits', () => {
  it('works', () => {
    expect(numberParse('e-7.344ohj94^ku6!b0du', {
      format: 'NUMBER_FLOAT',
      digits: 2
    })).toBeCloseTo(-7.34)
  })
})

describe('numberParse: format to string float', () => {
  it('works', () => {
    expect(numberParse(')js-.-22.3-NJJ0.k', {
      format: 'STRING_FLOAT'
    })).toBe('-22.3')
  })
})

describe('numberParse: format to number int', () => {
  it('works', () => {
    expect(numberParse('"sss>+99.88-33.a9).eee"', {
      format: 'NUMBER_INT'
    })).toBe(99)
  })
})

describe('numberParse: use customRegexp', () => {
  it('works', () => {
    expect(numberParse('as9jsadj"sss33.a9).eee"', {
      customRegexp: /([1-5]+)/g
    })).toBe("33")
  })
})

describe('numberParse: use customRegexp but not match', () => {
  it('works', () => {
    expect(numberParse('99', {
      customRegexp: /([1-7]+)/g
    })).toBeUndefined()
  })
})

describe('numberParse: use customRegexp and input is empty', () => {
  it('works', () => {
    expect(numberParse('')).toBeUndefined()
  })
})

/** numberMatch */

describe('numberMatch: format to number float and has rounding digits', () => {
  it('works', () => {
    expect(numberMatch('11,2233.52288880wqjeio-90.79809-33', {
      format: 'NUMBER_FLOAT',
      digits: 3
    })).toEqual([11, 2233.522, -90.798, -33])
  })
})

describe('numberMatch: only match float which less than zero', () => {
  it('works', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90.79809-33', {
      format: 'NUMBER_FLOAT',
      customRegexp: /-\d+(\.\d+)/g
    })).toEqual([-2233.522888, -90.79809])
  })
})

describe('1numberMatch: only match float which less than zero', () => {
  it('works', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90', {
      format: 'STRING_INT',
    })).toEqual(['-11', '-02233', '522888', '80', '-90'])
  })
})


describe('numberMatch: no input params', () => {
  it('works', () => {
    expect(numberMatch('-11,-02233.522888ss80wqjeio-90.79809-33'))
      .toEqual(['-11', '-02233.522888', '80', '-90.79809', '-33'])
  })
})

describe('numberMatch: no matchs', () => {
  it('works', () => {
    expect(numberMatch(')'))
      .toEqual([])
  })
})
