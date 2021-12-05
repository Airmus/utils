import isType from '../isType'
import { logger } from '../shared'

type IMode = 'local' | 'session'

export type StorageMethod = {
  get: <T>(key: string) => T | undefined
  set: <T>(key: string, value: T, expires?: string | number) => CommonStorage
  remove: (key: string | string[]) => CommonStorage
  has: (key: string) => boolean
  clear: () => CommonStorage
}
// 拼接前缀的装饰器工厂
function prefix(target: CommonStorage, _name: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value
  descriptor.value = function () {
    const key = arguments[0]
    const prefix = target.getPrefix()
    if (!key) throw new Error('')
    return oldValue.apply(this, {
      ...arguments,
      '0': prefix ? `${prefix}-${key}` : key // 拼接完整的key
    })
  };
  return descriptor;
}
class CommonStorage {
  private prefix: string = ''
  private storage: Storage = localStorage

  public constructor(mode: IMode, options: { prefix?: string }) {
    this.storage = window[`${mode}Storage` as keyof Window] // 处理 semantic error TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
    this.prefix = options.prefix || ''
  }

  @prefix
  public get<T>(key: string) {
    const value = JSON.parse(this.storage.getItem(key) || '{}')
    if (value.timestamp && value.timestamp <= new Date().getTime()) {
      return value.data as T
    } else {
      this.remove(key)
      return null
    }
  }

  @prefix
  public set<T>(key: string, value: T, expires?: string | number) {
    this.storage.setItem(key, JSON.stringify({
      timestamp: isType(expires, 'number', 'string') ?
        new Date().getTime() + (parseInt(expires!.toString()) || 0)
        : null,
      data: JSON.stringify(value)
    }))
    return this.storage
  }

  @prefix
  public remove(key: string) {
    if (typeof key === 'string') {
      this.storage.removeItem(key)
    } else {
      logger.logErr('Your input is illegal，please check removeStorage')
    }
    return this.storage
  }

  @prefix
  public has(key: string): boolean {
    if (typeof key === 'string') {
      return this.storage.getItem(key) !== null
    } else {
      logger.logErr('Your input is illegal，please check removeStorage')
      return false
    }
  }

  public clear() {
    this.storage.clear()
    return this.storage
  }

  public getPrefix(): string {
    return this.prefix
  }
}

export class ProStorage {
  public local: CommonStorage = new CommonStorage('local', {});
  public session: CommonStorage = new CommonStorage('session', {});

  public constructor(options?: { prefix?: string }) {
    this.local = new CommonStorage('local', options || {})
    this.session = new CommonStorage('session', options || {})
  }
}

export default new ProStorage()
