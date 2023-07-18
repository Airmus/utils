import { expect, test } from 'vitest'
import { RGBToHex, hexToRGB } from '..'

test('colorUtils', () => {
  test('RGBToHex', () => {
    test('should convert an RGB color value to a 6-digit hex color value', () => {
      expect(RGBToHex('rgb(255, 0, 0)')).toEqual('#FF0000')
      expect(RGBToHex('rgb(0, 255, 0)')).toEqual('#00FF00')
      expect(RGBToHex('rgb(0, 0, 255)')).toEqual('#0000FF')
      expect(RGBToHex('rgb(255, 255, 255)')).toEqual('#FFFFFF')
      expect(RGBToHex('rgb(0, 0, 0)')).toEqual('#000000')
    })

    test('should convert an RGBA color value to an 8-digit hex color value', () => {
      expect(RGBToHex('rgba(255, 0, 0, 0.5)')).toEqual('#FF000080')
      expect(RGBToHex('rgba(0, 255, 0, 0.5)')).toEqual('#00FF0080')
      expect(RGBToHex('rgba(0, 0, 255, 0.5)')).toEqual('#0000FF80')
      expect(RGBToHex('rgba(255, 255, 255, 0.5)')).toEqual('#FFFFFF80')
      expect(RGBToHex('rgba(0, 0, 0, 0.5)')).toEqual('#00000080')
    })

    test('an invalid input rgb color', () => {
      expect(() => RGBToHex('invalid-color')).toThrowError(
        'Invalid input color: invalid-color',
      )
    })
  })

  test('hexToRGB', () => {
    test('should convert a 6-digit hex color value to an RGB color value', () => {
      expect(hexToRGB('#FF0000')).toEqual('rgb(255, 0, 0)')
      expect(hexToRGB('#00FF00')).toEqual('rgb(0, 255, 0)')
      expect(hexToRGB('#0000FF')).toEqual('rgb(0, 0, 255)')
      expect(hexToRGB('#FFFFFF')).toEqual('rgb(255, 255, 255)')
      expect(hexToRGB('#000000')).toEqual('rgb(0, 0, 0)')
    })

    test('should convert an 8-digit hex color value to an RGBA color value', () => {
      expect(hexToRGB('#FF000080')).toEqual('rgba(255, 0, 0, 0.5)')
      expect(hexToRGB('#00FF0080')).toEqual('rgba(0, 255, 0, 0.5)')
      expect(hexToRGB('#0000FF80')).toEqual('rgba(0, 0, 255, 0.5)')
      expect(hexToRGB('#FFFFFF80')).toEqual('rgba(255, 255, 255, 0.5)')
      expect(hexToRGB('#00000080')).toEqual('rgba(0, 0, 0, 0.5)')
    })

    test('an invalid input hex color', () => {
      expect(() => hexToRGB('invalid-color')).toThrowError(
        'Invalid input color: invalid-color',
      )
    })
  })
})
