/*
 * @Date: 2021-12-13 23:42:56
 * @LastEditTime: 2021-12-19 22:12:12
 * @Description: 依次执行数组中的函数
 */

// eslint-disable-next-line @typescript-eslint/ban-types
function pipe<T>(x: unknown, ...fns: Function[]): T {
  return fns.reduce((y: unknown, fn) => fn(y), x)
}

export default pipe
