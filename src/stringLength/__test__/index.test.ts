import { stringLength } from '..'
import { expect, test } from 'vitest'

test('stringLength', () => {
  test('returns 0 for empty strings', () => {
    expect(stringLength('')).toBe(0);
  });

  test('returns 1 for strings with a single character', () => {
    expect(stringLength('a')).toBe(1);
  });

  test('returns the correct length for strings with multiple characters', () => {
    expect(stringLength('hello')).toBe(5);
    expect(stringLength('你好')).toBe(2);
    expect(stringLength('👋🏻')).toBe(2);
    expect(stringLength('👨‍👩‍👦')).toBe(1);
    expect(stringLength('Hello, 世界!')).toBe(12);
  });
});