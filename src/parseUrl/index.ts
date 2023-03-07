/**
 * parse url search params
 * @param url
 * @returns Record<string, string | string[]>
 */

type ResultValue = string | number | string[] | number[]

type Result = Record<string, ResultValue>

export const parseUrl = (url: string = typeof window === 'undefined' ? '' : window.location.search): Result => {
  if (typeof url !== 'string' || !url) return {}

  const searchPath = url.indexOf('?') === -1 ? url : url.match(/.+\?(.+)/)![1]

  const urlSearchParams = new URLSearchParams(searchPath).entries()

  const result: Result = {}

  for (const [key, value] of urlSearchParams) {
    let decodedValue: ResultValue = decodeURIComponent(value)
    if (/^-?\d+(\.\d+)?$/.test(decodedValue as string)) {
      decodedValue = parseFloat(decodedValue as string)
    }
    if (result[key] === undefined) {
      result[key] = decodedValue
    } else {
      // @ts-ignore
      result[key] = [...(result[key] as ResultValue[]), decodedValue]
    }
  }

  return result
}
