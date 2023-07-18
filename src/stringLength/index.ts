const segmenter = new Intl.Segmenter()

export function stringLength(string: string) {
  if (!string) {
    return 0
  }

  let length = 0

  for (const _ of segmenter.segment(string)) {
    length++
  }

  return length
}
