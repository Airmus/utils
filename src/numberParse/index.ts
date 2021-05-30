/** 字符串整数、字符串浮点数、数字整数、数字浮点数 */
export type IFormat =
  | 'STRING_INT'
  | 'STRING_FLOAT'
  | 'NUMBER_INT'
  | 'NUMBER_FLOAT'

export type Options<T> = {
  /** 保留小数点精度 */
  digits?: number
  /** 数据返回的形式 */
  format?: T | IFormat
  /** 自定义匹配规则 */
  customRegexp?: RegExp
}
/** 整数匹配(单个) */
const SINGLE_INTEGER_REGEXP = /-?\d+/
/** 浮点数匹配(单个) */
const SINGLE_FLOAT_REGEXP = /-?\d+(\.\d+)?/
/** 整数匹配(全局) */
const INTEGER_REGEXP = /-?\d+/g
/** 浮点数匹配(全局) */
const FLOAT_REGEXP = /-?\d+(\.\d+)?/g

type ParserResult<T> = T extends ('NUMBER_FLOAT' | 'NUMBER_INT') ? number : string

export const numberParse = <T = 'STRING_FLOAT'>(str: string, options?: Options<T>): ParserResult<T> | undefined => {
  const { digits, format = 'STRING_FLOAT', customRegexp } = options ?? {}
  const isFloat = format === 'NUMBER_FLOAT' || format === 'STRING_FLOAT'
  const isNumber = format === 'NUMBER_FLOAT' || format === 'NUMBER_INT'
  let matchRegexp: RegExp = SINGLE_INTEGER_REGEXP
  if (customRegexp) {
    matchRegexp = customRegexp
  } else if (isFloat) {
    matchRegexp = SINGLE_FLOAT_REGEXP
  }
  const match: string | undefined = (str.match(matchRegexp) ?? [])[0]
  if (match === undefined) {
    return undefined
  } else {
    if (digits === undefined) {
      // 保留全部小数位
      return (
        isNumber ? Number(match) : match
      ) as ParserResult<T>
    } else {
      return (
        isNumber ? Number(Number(match).toFixed(digits)) : Number(match).toFixed(digits)
      ) as ParserResult<T>
    }
  }
}

export const numberMatch = <T = 'STRING_FLOAT'>(str: string, options?: Options<T>): ParserResult<T>[] => {
  const { digits, format = 'STRING_FLOAT', customRegexp } = options ?? {}
  const isFloat = format === 'NUMBER_FLOAT' || format === 'STRING_FLOAT'
  const isNumber = format === 'NUMBER_FLOAT' || format === 'NUMBER_INT'
  let matchRegexp: RegExp = INTEGER_REGEXP
  if (customRegexp) {
    matchRegexp = customRegexp
  } else if (isFloat) {
    matchRegexp = FLOAT_REGEXP
  }
  const matchs: string[] = str.match(matchRegexp) ?? []
  if (digits === undefined) {
    // 保留全部小数位
    return (
      isNumber ? matchs.map(item => Number(item)) : matchs
    ) as ParserResult<T>[]
  } else {
    return (
      isNumber ? matchs.map(item => Number(Number(item).toFixed(digits))) : matchs.map(item => Number(item).toFixed(digits))
    ) as ParserResult<T>[]
  }
}
