import isType from '../isType'
import { logger } from '../shared'

type IMode = 'local' | 'session'

type StorageMethod = {
  get: <T>(key: string) => T | undefined
  set: <T>(key: string, value: T, expires?: string | number) => CommonStorage
  remove: (key: string | string[]) => CommonStorage
  has: (key: string) => boolean
  clear: () => CommonStorage
}

class CommonStorage {
  private prefix: string = ''
  private storage: Storage = localStorage

  public constructor(mode: IMode, options: { prefix?: string }) {
    this.storage = window[`${mode}Storage`]
    this.prefix = options.prefix || ''
  }

  // 计算完整的key
  private composeKey = (key: string) => {
    if (!key) throw new Error('')
    return this.prefix ? `${this.prefix}-${key}` : key
  }

  public get<T>(key: string) {
    const value = JSON.parse(this.storage.getItem(key) || '{}')
    if (value.timestamp && value.timestamp <= new Date().getTime()) {
      return value.data as T
    } else {
      this.remove(key)
      return null
    }
  }

  public set<T>(key: string, value: T, expires?: string | number) {
    this.storage.setItem(key, JSON.stringify({
      timestamp: isType(expires, 'number', 'string') ?
        new Date().getTime() + (parseInt(expires!.toString()) || 0)
        : null,
      data: JSON.stringify(value)
    }))
    return this.storage
  }

  public remove(key: string) {
    if (typeof key === 'string') {
      this.storage.removeItem(key)
    } else {
      logger.logErr('Your input is illegal，please check removeStorage')
    }
    return this.storage
  }

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
}

export class ProStorage {
  public local: CommonStorage | null = null;
  public session: CommonStorage | null = null;

  public constructor(options?: { prefix?: string }) {
    this.local = new CommonStorage('local', options || {})
    this.session = new CommonStorage('session', options || {})
  }
}

export default new ProStorage()
