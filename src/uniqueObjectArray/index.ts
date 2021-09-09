/*
 * @Date: 2021-09-09 10:03:48
 * @LastEditTime: 2021-09-09 10:29:32
 * @Description: 对象数组去重
 */

export type Options = {
  key?: string
}

type IKey<T = string> = T | number | string

const uniqueObjectArray = <T extends Record<string, any>>(arr: T[], options?: Options): T[] => {
  if (Array.isArray(arr)) {
    const { key } = options || {}
    return [...new Map<IKey<T>, T>(arr.map((item: T) => [key === undefined ? item as T : item[key] as IKey, item])).values()]
  } else {
    return []
  }
}

export default uniqueObjectArray
