
declare global {
  interface Number {
    add: (num: number) => number
    minus: (num: number) => number
    multi: (num: number) => number
    div: (num: number) => number
  }
}

export const linkCalculator = (num: number) => {
  let res = num

  Number.prototype.add = function (num: number) {
    res += num
    return res
  }
  Number.prototype.minus = function (num: number) {
    res -= num
    return res
  }
  Number.prototype.multi = function (num: number) {
    res *= num
    return res
  }
  Number.prototype.div = function (num: number) {
    res /= num
    return res
  }
  return res
}

