import isType from '../isType'
import { logger } from '../shared'

type IMode = 'local' | 'session'

type StorageMethod = {
  get: <T>(key: string) => T | undefined
  set: <T>(key: string, value: T, expires?: string | number) => void
  remove: (name: string | string[]) => void
}

class CommonStorage {
  private storage: Storage = localStorage

  public constructor(mode: IMode) {
    this.storage = window[`${mode}Storage`]
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

  public remove(name: string) {
    if (typeof name === 'string') {
      this.storage.removeItem(name)
    } else {
      logger.logErr('Your input is illegal，please check removeStorage')
    }
    return this.storage
  }

  public has(name: string): boolean {
    if (typeof name === 'string') {
      return this.storage.getItem(name) !== null
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

  public constructor() {
    this.local = new CommonStorage('local')
    this.session = new CommonStorage('session')
  }
}

export default new ProStorage()
