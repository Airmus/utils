/**
 * parse url search params
 * @param url 
 * @returns Record<string, string | string[]>
 */
export const parseUrl = (url: string): Record<string, string | string[]> => {
  if (typeof url !== 'string' || !url) return {}

  const searchPath = url.indexOf('?') === -1 ? url : url.match(/.+\?(.+)/)![1]

  const urlSearchParams = new URLSearchParams(searchPath).entries()

  const result: Record<string, string | string[]> = {}

  for (const [key, value] of urlSearchParams) {
    const decodedValue = decodeURIComponent(value)
    if (result[key] === undefined) {
      result[key] = decodedValue
    } else {
      result[key] = [...result[key] as string, decodedValue]
    }
  }

  return result
}