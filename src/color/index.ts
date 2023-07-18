/**
 * 将 RGB 颜色值转换为十六进制颜色值
 * @param {string} color RGB 颜色值，格式为 "rgb(r, g, b)" 或 "rgba(r, g, b, a)"
 * @return {string | null} 返回对应的十六进制颜色值，格式为 "#RRGGBB" 或 "#RRGGBBAA"（如果原 RGB 颜色值中有透明度 a）
 */
export function RGBToHex(color: string): string | null {
  // 匹配 "rgb(r, g, b)" 或 "rgba(r, g, b, a)"
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d.]+))?\)/)
  if (!match) {
    throw new Error(`Invalid input color: ${color}`)
  }

  const r = Number.parseInt(match[1], 10).toString(16).padStart(2, '0')
  const g = Number.parseInt(match[2], 10).toString(16).padStart(2, '0')
  const b = Number.parseInt(match[3], 10).toString(16).padStart(2, '0')
  const a = match[5] ? Math.round(Number.parseFloat(match[5]) * 255).toString(16).padStart(2, '0') : ''

  return `#${r}${g}${b}${a}`.toUpperCase()
}

/**
 * 将十六进制颜色值转换为 RGB 颜色值
 * @param {string} color 十六进制颜色值，格式为 "#RRGGBB" 或 "#RRGGBBAA"（如果有透明度 a）
 * @return {string | null} 返回对应的 RGB 颜色值，格式为 "rgb(r, g, b)" 或 "rgba(r, g, b, a)"
 */
export function hexToRGB(color: string): string | null {
  // 去除可能包含的 "#" 符号
  const hex = color.replace('#', '')

  // 拆分 r、g、b、a 值
  let r = ''
  let g = ''
  let b = ''
  let a = ''
  if (hex.length === 3) {
    r = hex[0].repeat(2)
    g = hex[1].repeat(2)
    b = hex[2].repeat(2)
  }
  else if (hex.length === 6) {
    r = hex.slice(0, 2)
    g = hex.slice(2, 4)
    b = hex.slice(4, 6)
  }
  else if (hex.length === 8) {
    r = hex.slice(0, 2)
    g = hex.slice(2, 4)
    b = hex.slice(4, 6)
    a = `${Number.parseInt(hex.slice(6, 8), 16) / 255}`.slice(0, 3)
  }
  else {
    throw new Error(`Invalid input color: ${color}`)
  }

  if (a) {
    return `rgba(${Number.parseInt(r, 16)}, ${Number.parseInt(g, 16)}, ${Number.parseInt(b, 16)}, ${a})`
  }
  return `rgb(${Number.parseInt(r, 16)}, ${Number.parseInt(g, 16)}, ${Number.parseInt(b, 16)})`
}
