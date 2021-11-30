import { logger } from '../shared'

type IValue = number | string | Record<string, unknown> | IValue[]

type IMode = 'local' | 'session'

type StorageMethod = {
  getStorage: <T>(key: string) => T | undefined
  setStorage: <T extends IValue>(key: string, value: T, expires?: string | number) => void
  removeStorage: (name: string | string[]) => void
}

export class ProStorage {
  // private prefix: string = ''
  public local: StorageMethod | null = null;
  public session: StorageMethod | null = null;

  constructor() {
    this.local = {
      getStorage: this.getStorage,
      setStorage: this.setStorage,
      removeStorage: this.removeStorage,
    }
    this.session = {
      getStorage: this.getStorage,
      setStorage: this.setStorage,
      removeStorage: this.removeStorage,
    }
  }

  private getStorage(key: string) {
    const value = JSON.parse(localStorage.getItem(key) || '{}')
    if (value.timestamp && value.timestamp <= new Date().getTime()) {
      return value.data
    } else {
      this.removeStorage(key)
      return undefined
    }
  }

  private setStorage<T extends IValue>(key: string, value: T, expires?: string | number) {
    return (fn: Storage) => fn.setItem(key, JSON.stringify({
      timestamp: expires ? new Date().getTime() : null,
      data: value
    }))
  }

  private removeStorage(name: string | string[]) {
    if (typeof name === 'string') {
      localStorage.removeItem(name)
    } else if (Array.isArray(name)) {
      name.forEach(key => {
        localStorage.removeItem(key)
      })
    } else {
      logger.logErr('Your input is illegal，please check removeStorage')
    }
  }
}

export default new ProStorage()
