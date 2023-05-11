/*
 * @Date: 2021-09-13 20:25:31
 * @Description: 数据类型判断
 */

export type IType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'undefined'
  | 'symbol'
  | 'bigint'
  | 'array'
  | 'function'
  | 'regexp'
  | 'promise'
  | 'date'
  | 'dom'
  | 'null'
  | 'object'

const getType = (value: any): IType => {
  if (value instanceof Element) {
    return 'dom'
  }
  const tempType = Object.prototype.toString.call(value)
  // '[object String]'  从字符串截取出对应的类型
  const maybeType = tempType.slice(8, tempType.length - 1).toLowerCase()
  if (['number', 'string', 'boolean', 'undefined', 'symbol', 'bigint', 'array', 'function', 'regexp', 'promise', 'date', 'null'].includes(maybeType)) {
    return maybeType as IType
  } else {
    return 'object'
  }
}

export const isType = (value: any, ...rest: IType[]) => {
  if (rest.length === 0) {
    return value === undefined
  } else {
    return rest.some(type => getType(value) === type)
  }
}
