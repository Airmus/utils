/*
 * @Date: 2021-09-09 22:55:02
 * @LastEditTime: 2021-09-14 23:42:38
 * @Description: 通过路径取出 对象/数组 的value
 */

import { isType } from '..'

export type IPath = string | (number | string)[]

const deepGet = (target: object, path: IPath, defaultValue?: any) => {
  let pathArr: (string | number)[] = []
  let value: any
  if (typeof path === 'string') {
    pathArr = path.split('.')
  } else if (Array.isArray(path)) {
    pathArr = Array.from(path)
  } else {
    return defaultValue
  }
  value = target
  while (isType(value, 'object', 'array') && pathArr.length) {
    const key = pathArr.shift()
    if (key) {
      value = value[key]
    }
  }
  return value === undefined ? defaultValue : value
}

export default deepGet
