# @airmus/utils

`@airmus/utils` 是一个集合了多个常用方法的工具库。

## 安装

```bash
npm install @airmus/utils 
# 或
yarn add @airmus/utils
```

## 使用

```tsx
import { scrollToView } from '@airmus/utils'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    scrollToView({
      behavior: 'smooth',
      selector: '#footer'
    })
  }, [])

  return (
    <div>
      <header id='nav'></header>
      <section>
        Here is a containter
      </section>
      <footer id='footer'>
      </footer>
    </div>
  )
}
```

## API

### numberParse

解析字符串中的数字

``` tsx
/** 字符串整数、字符串浮点数、数字整数、数字浮点数 */
type IFormat =
  | 'STRING_INT'
  | 'STRING_FLOAT'
  | 'NUMBER_INT'
  | 'NUMBER_FLOAT'

type Options<T> = {
  /** 保留小数点精度 */
  digits?: number
  /** 数据返回的形式 */
  format?: T | IFormat
  /** 自定义匹配规则 */
  customRegexp?: RegExp
}

/** 提取数字 */

// 格式化成字符串整数，并保留两位小数 '123.00'
numberParse('asdfg123.44*66..', { digits: 2, format: 'STRING_INT' })

// 格式化成数字浮点数 '123.44'
numberParse('asdfg123.44*66..', { format: 'NUMBER_FLOAT' })

numberParse('-2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// -2

/** 多个匹配 */

numberMatch('-2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// [-2, -123, 44, 66]

numberMatch('-1.2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// [-1, 2, -123, 44, 66]

numberMatch('-1.2.ppd-123.44*66..', { format: 'STRING_FLOAT' })
// ["-1.2", "-123.44", "66"]

numberMatch('-1.2.ppd-123.44*66..', { format: 'STRING_FLOAT', customRegexp: /[1-5]+/g })
// 自定义正则匹配 ["-1.2", "-123.44", "66"]

```

### scrollToView

dom元素滚动到可视区域

``` tsx
type ScrollToOptions = {
  /** 与左侧视口的距离 */
  left?: number
  /** 与顶部视口的距离 */
  top?: number
  /** 立即滚动 or 平滑滚动 */
  behavior: "auto" | "smooth"
}
type Options = ScrollToOptions & {
  /** 横向滚动位置偏移量，正数偏右，负数偏左 */
  offsetX?: number
  /** 纵向滚动位置偏移量，正数偏上，负数偏下 */
  offsetY?: number
  /** css选择器，用于指定滚动的dom */
  selector?: string
}

// id为app的dom滚动到视口区域，并向下偏移100像素
scrollToView({
  selector: '#app'
  offsetY: 100
})

// 不指定selector，直接给出绝对位置
scrollToView({
  top: 200,
  left: 400
})

// 不指定selector，也没有传入具体位置，则会根据路由里面的锚点进行定位（如果有）
// https://test.example.com/demo#abcd
scrollToView() // 会锚点定位到’#abcd‘
```

### toFixed

控制小数精度（支持四舍五入可控）

``` tsx
type Options = {
  /** 是否四舍五入 */
  rounding?: boolean
  /** 保留多少位小数  */
  digits?: number
}

// 保留两位小数 '123.00'
toFixed('123', { digits: 2 })

//  '-123.124'
toFixed(-3.124)

// 四舍五入 '-123.125'
toFixed(-3.1247, { rounding: true, digits: 3 })
```

### isType

数据类型检测

``` tsx
type IType =
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

// 第一个参数为目标值，后面可选多个可能的类型
isType(value [, type1, ..., typen])

isType('value','string') // true

isType(NaN,'object') // false

// 多个可选类型 (任一满足即可)
isType(/^a(\w+)z$/),'object','string','date') // false
isType(/^a(\w+)z$/),'array','regexp') // true
```

### deepGet

根据路径获取嵌套数据

``` tsx
type IPath = string | (number | string)[]

deepGet(target: object, path: IPath, defaultValue?: any)

// 字符串路径
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, 'a.b.c')  // s2

// 数组路径
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', 'b.c']) // s1
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', 'b', 'c']) // s2

// 默认值
deepGet([{ a: [{ b: 1 }] }], '0.a.0.b.c', 'error') // error
```

### RGBToHex

将 RGB 颜色值转换为十六进制颜色值。

```typescript

console.log(RGBToHex('rgb(255, 255, 255)')); // "#FFFFFF"

console.log(RGBToHex('rgba(0, 255, 0, 0.5)')); // "#00FF0080"

```

### hexToRGB

将十六进制颜色值转换为 RGB 颜色值。

```typescript

console.log(hexToRGB('#FF0000')); // "rgb(255, 0, 0)"

console.log(hexToRGB('#FF000080')); // "rgb(255, 0, 0, 0.5)"

```
