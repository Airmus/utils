/**
 * parse url search params
 * @param url
 * @returns Record<string, string | string[]>
 */

type ResultValue = string | number | string[] | number[]

type Result = Record<string, ResultValue>

export function parseUrl(url: string = typeof window === 'undefined' ? '' : window.location.search): Result {
  if (typeof url !== 'string' || !url) {
    return {}
  }

  const searchPath = !url.includes('?') ? url : url.match(/.+\?(.+)/)![1]

  const urlSearchParams = new URLSearchParams(searchPath).entries()

  const result: Result = {}

  for (const [key, value] of urlSearchParams) {
    let decodedValue: ResultValue = decodeURIComponent(value)
    if (/^-?\d+(\.\d+)?$/.test(decodedValue as string)) {
      decodedValue = Number.parseFloat(decodedValue as string)
    }
    if (result[key] === undefined) {
      result[key] = decodedValue
    }
    else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result[key] = [...(result[key] as ResultValue[]), decodedValue]
    }
  }

  return result
}
