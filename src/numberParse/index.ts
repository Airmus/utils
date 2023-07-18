/*
 * @Date: 2021-06-09 19:16:34
 * @LastEditTime: 2021-09-02 23:31:43
 * @Description: 字符串提取数字
 */
import toFixed from '../toFixed'

/** 字符串整数、字符串浮点数、数字整数、数字浮点数 */
export type IFormat =
  | 'STRING_INT'
  | 'STRING_FLOAT'
  | 'NUMBER_INT'
  | 'NUMBER_FLOAT'

export interface Options<T> {
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

/** 解析字符串中的数字 */
export function numberParse<T = 'STRING_FLOAT'>(str: string, options?: Options<T>): ParserResult<T> | undefined {
  const { digits, format = 'STRING_FLOAT', customRegexp } = options ?? {}
  const isFloat = format === 'NUMBER_FLOAT' || format === 'STRING_FLOAT'
  const isNumber = format === 'NUMBER_FLOAT' || format === 'NUMBER_INT'
  let matchRegexp: RegExp = SINGLE_INTEGER_REGEXP
  if (customRegexp) {
    matchRegexp = customRegexp
  }
  else if (isFloat) {
    matchRegexp = SINGLE_FLOAT_REGEXP
  }
  const match: string | undefined = (str.match(matchRegexp) ?? [])[0]
  if (match === undefined) {
    return undefined
  }
  else {
    return (
      isNumber ? Number(toFixed(match, { digits })) : toFixed(match, { digits })
    ) as ParserResult<T>
  }
}

/** 匹配字符串中的数字 */
export function numberMatch<T = 'STRING_FLOAT'>(str: string, options?: Options<T>): ParserResult<T>[] {
  const { digits, format = 'STRING_FLOAT', customRegexp } = options ?? {}
  const isFloat = format === 'NUMBER_FLOAT' || format === 'STRING_FLOAT'
  const isNumber = format === 'NUMBER_FLOAT' || format === 'NUMBER_INT'
  let matchRegexp: RegExp = INTEGER_REGEXP
  if (customRegexp) {
    matchRegexp = customRegexp
  }
  else if (isFloat) {
    matchRegexp = FLOAT_REGEXP
  }
  const matchs: string[] = str.match(matchRegexp) ?? []
  return (
    isNumber ? matchs.map(item => Number(toFixed(item, { digits }))) : matchs.map(item => toFixed(item, { digits }))
  ) as ParserResult<T>[]
}
