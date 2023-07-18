/*
 * @Date: 2021-09-09 10:03:48
 * @LastEditTime: 2021-09-09 23:23:13
 * @Description: 对象数组去重
 */

export interface Options {
  /** 唯一标识
   * undefined:自身做唯一标识符
   * string:深层路径  如 a.b.c ---> [{a:{b:{c:111}}},{a:{b:{c:222}}}]
   * Array:同上，支持键值含有.的情况
   * */
  key?: string
  // | (string | number)[]
}

type IKey<T = string> = T | number | string

function uniqueObjectArray<T extends Record<string, any>>(arr: T[], options?: Options): T[] {
  if (Array.isArray(arr)) {
    const { key } = options || {}
    return [...new Map<IKey<T>, T>(arr.map((item: T) => [(key === undefined || item[key] === undefined) ? item as T : item[key] as IKey, item])).values()]
  }
  else {
    return []
  }
}

export default uniqueObjectArray
