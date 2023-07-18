/**
 * 双向Map
 * https://www.npmjs.com/package/bidirectional-map
 */

type IMapKey = number | string | symbol

export class BidirectionalMap<K extends IMapKey = any, V extends IMapKey = any> {
  private _map = new Map<K, V>()
  private _reverse = new Map<V, K>()

  constructor(object: Record<K, V>) {
    if (object) {
      for (const attr in object) {
        if ({}.hasOwnProperty.call(object, attr)) {
          this.set(attr, object[attr])
        }
      }
    }
  }

  public get size() {
    return this._map.size
  }

  public set(key: K, value: V) {
    if (this._map.has(key)) {
      const _value = this._map.get(key)
      if (_value) {
        this._reverse.delete(_value)
      }
    }
    if (this._reverse.has(value)) {
      const _key = this._reverse.get(value)
      if (_key) {
        this._map.delete(_key)
      }
    }
    this._map.set(key, value)
    this._reverse.set(value, key)
  }

  public get(key: K) {
    return this._map.get(key)
  }

  public getKey(value: V) {
    return this._reverse.get(value)
  }

  public clear() {
    this._map.clear()
    this._reverse.clear()
  }

  public delete(key: K) {
    const value = this._map.get(key)
    this._map.delete(key)
    if (value) {
      this._reverse.delete(value)
    }
  }

  public deleteValue(value: V) {
    const key = this._reverse.get(value)
    if (key) {
      this._map.delete(key)
    }
    this._reverse.delete(value)
  }

  public entries() {
    return this._map.entries()
  }

  public has(key: K) {
    return this._map.has(key)
  }

  public hasValue(value: V) {
    return this._reverse.has(value)
  }

  public keys() {
    return this._map.keys()
  }

  public values() {
    return this._map.values()
  }
}
