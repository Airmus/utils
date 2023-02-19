# @airmus/utils

`@airmus/utils` is a utility library that includes multiple commonly used methods.

## Installation

```bash
npm install @airmus/utils 
# or
yarn add @airmus/utils
```

## Usage

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

Parse numbers in a string.

``` tsx
/** String integer, String float, Numeric integer, Numeric float */
type IFormat =
  | 'STRING_INT'
  | 'STRING_FLOAT'
  | 'NUMBER_INT'
  | 'NUMBER_FLOAT'

type Options<T> = {
  /** Number of decimal places */
  digits?: number
  /** Return value format */
  format?: T | IFormat
  /** Custom regular expression */
  customRegexp?: RegExp
}

/** Extract numbers */

// Format as a string integer and keep two decimal places: '123.00'
numberParse('asdfg123.44*66..', { digits: 2, format: 'STRING_INT' })

// Format as a numeric float: '123.44'
numberParse('asdfg123.44*66..', { format: 'NUMBER_FLOAT' })

numberParse('-2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// -2

/** Multiple matches */

numberMatch('-2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// [-2, -123, 44, 66]

numberMatch('-1.2.ppd-123.44*66..', { format: 'NUMBER_INT' })
// [-1, 2, -123, 44, 66]

numberMatch('-1.2.ppd-123.44*66..', { format: 'STRING_FLOAT' })
// ["-1.2", "-123.44", "66"]

numberMatch('-1.2.ppd-123.44*66..', { format: 'STRING_FLOAT', customRegexp: /[1-5]+/g })
// Custom regular expression matching: ["-1.2", "-123.44", "66"]


```

### scrollToView

Scroll a DOM element into view.

``` tsx
type ScrollToOptions = {
  /** Distance from the left side of the viewport */
  left?: number
  /** Distance from the top of the viewport */
  top?: number
  /** Scroll type */
  behavior: "auto" | "smooth"
}
type Options = ScrollToOptions & {
  /** Horizontal scrolling position offset, positive values offset to the right, negative values offset to the left */
  offsetX?: number
  /** Vertical scrolling position offset, positive values offset upwards, negative values offset downwards */
  offsetY?: number
  /** CSS selector for scrolling a DOM element */
  selector?: string
}

// Scroll the DOM element with id='app' into view and offset it downwards by 100 pixels.
scrollToView({
  selector: '#app'
  offsetY: 100
})

// Specify absolute position without a selector.
scrollToView({
  top: 200,
  left: 400
})

// No selector is specified, and no specific location is passed, so the anchor in the route will be used for positioning (if

```

### toFixed

Control decimal precision (supports customizable rounding)

``` tsx
type Options = {
  /** Whether to round */
  rounding?: boolean
  /** How many decimal places to keep */
  digits?: number
}

// Keep 2 decimal places '123.00'
toFixed('123', { digits: 2 })

//  '-123.124'
toFixed(-3.124)

// Round up '-123.125'
toFixed(-3.1247, { rounding: true, digits: 3 })

```

### isType

Type checking for data

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

// The first parameter is the target value, followed by optional possible types
isType(value [, type1, ..., typen])

isType('value','string') // true

isType(NaN,'object') // false

// Multiple optional types (any one is satisfied)
isType(/^a(\w+)z$/),'object','string','date') // false
isType(/^a(\w+)z$/),'array','regexp') // true

```

### deepGet

Get nested data based on the path

``` tsx
type IPath = string | (number | string)[]

deepGet(target: object, path: IPath, defaultValue?: any)

// String path
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, 'a.b.c')  // s2

// Array path
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', 'b.c']) // s1
deepGet({ a: { 'b.c': 's1', b: { c: 's2' } } }, ['a', 'b', 'c']) // s2

// Default value
deepGet([{ a: [{ b: 1 }] }], '0.a.0.b.c', 'error') // error

```

### RGBToHex

Convert RGB color value to hexadecimal color value

```typescript


console.log(RGBToHex('rgb(255, 255, 255)')); // "#FFFFFF"

console.log(RGBToHex('rgba(0, 255, 0, 0.5)')); // "#00FF0080"

```

### hexToRGB

Convert hexadecimal color value to RGB color value

```typescript

console.log(hexToRGB('#FF0000')); // "rgb(255, 0, 0)"

console.log(hexToRGB('#FF000080')); // "rgb(255, 0, 0, 0.5)"


```
