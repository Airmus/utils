export type Options = {
  /** 是否四舍五入 */
  rounding?: boolean
  /** 保留多少位小数  */
  digits?: number
}

const toFixed = (input: number | string, options?: Options): string => {
  const { rounding = false, digits } = options ?? {}
  const inputStr = String(input)
  //  非法输入 或者 不需要精度切割
  if (!input || !/\w+/.test(inputStr) || !digits || digits < 0) return inputStr

  if (rounding) {
    return Number(input).toFixed(digits)
  } else {
    let [integer, decimal = ''] = inputStr.split('.')
    const distance = digits - decimal.length
    if (distance > 0) {
      decimal += '0'.repeat(distance)
    } else {
      decimal = decimal.slice(0, digits)
    }
    return `${integer}.${decimal}`
  }
}

export default toFixed
