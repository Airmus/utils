export type IType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'undefined'
  | 'symbol'
  | 'bigint'
  | 'object'
  | 'array'
  | 'function'
  | 'regexp'
  | 'promise'
  | 'date'
  | 'dom'
  | 'class'
  | 'null'

const getType = (value: any): IType => {
  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    typeof value === 'symbol' ||
    typeof value === 'bigint'
  ) {
    return typeof value
  } else if (Array.isArray(value)) {
    return 'array'
  } else if (value === null) {
    return 'null'
  } else {
    return 'object'
  }
}

const isType = (value: any, ...rest: IType[]) => {
  if (rest.length === 0) {
    return getType(value) === 'undefined'
  } else {
    return rest.some(type => getType(value) === type)
  }
}

export default isType
