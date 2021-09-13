/*
 * @Date: 2021-09-09 22:55:02
 * @LastEditTime: 2021-09-13 22:09:39
 * @Description: 通过路径取出 对象/数组 的value
 */

export type IPath = string | (number | string)[]

const deepGet = (target: object, path: IPath, defaultValue?: any) => {
  let pathArr: (string | number)[] = []
  let value
  if (typeof path === 'string') {
    pathArr = path.split('.')
  } else if (Array.isArray(path)) {
    pathArr = Array.from(path)
  }
  value = target
  while (value && pathArr.length) {
    const key = pathArr.shift()
    if (key) {
      value = (value as any)[key]
    }
  }
  return value === undefined ? defaultValue : value
}

export default deepGet
