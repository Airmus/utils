/*
 * @Date: 2021-09-09 22:55:02
 * @LastEditTime: 2021-09-09 23:11:44
 * @Description: 通过路径取出 对象/数组 的value
 */

export type IPath = string | (number | string)[]

const deepGet = <T = any>(target: object, path: IPath, defaultValue?: T): T => {
  let pathArr: (string | number)[] = []
  let value: T = undefined
  if (typeof path === 'string') {
    pathArr = path.split('.')
  } else if (Array.isArray(path)) {
    pathArr = Array.from(path)
  }
  if (path.length === 0) {
    return value
  } else {
    const [first, ...rest] = pathArr
    return deepGet(target[first], rest)
  }
  return value
}

export default deepGet
