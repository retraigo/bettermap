/**
 * @class BetterMap
 */
export class BetterMap<K, V> extends Map<K, V> {
  name: string;
  /**
   * Create a new BetterMap
   * @param {string} name A friendly name for the BetterMap
   */
  constructor(name?: string) {
    super();
    this.name = typeof name === "string" ? name : "unknown items";
  }
  /**
   * Convert the map into an array of values / keys
   * @returns Array of items in the map
   */
  array(): V[];
  array(keys: boolean): K[];
  array(keys = false): K[] | V[] {
    return keys ? this.map<K>((_: V, x: K) => x) : this.map<V>((x: V) => x);
  }
  /**
   * Return the nth element of the map.
   * @param {number} pos Position to get data.
   * @returns {V} Item at specified index.
   */
  at(pos: number): V | undefined {
    if (pos > (this.size - 1)) pos = pos % (this.size - 1);
    if (pos < 0) pos = (this.size) + (pos % (this.size - 1));
    const val = this.values();
    for (let i = 0; i < pos; ++i) {
      val.next();
    }
    return val.next().value;
  }
  /**
   * Array#every but for a Map
   * @param fn Function to run on every element.
   * @returns {boolean} True or false
   */
  every(fn: (v: V, k: K) => boolean): boolean {
    for (const [k, v] of this.entries()) {
      if (!fn(v, k)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Array#filter but for a Map
   * @param fn Function to be passed.
   * @returns {BetterMap} BetterMap with elements that passed.
   */
  filter(fn: (v: V, k: K) => boolean): BetterMap<K, V> {
    const newColl = new BetterMap<K, V>(this.name);
    for (const [key, val] of this.entries()) {
      if (fn(val, key)) {
        newColl.set(key, val);
      }
    }
    return newColl;
  }
  /**
   * @param fn Function to be passed.
   * @returns A value from the map. If none found, returns undefined.
   */
  find(fn: (v: V, k: K) => boolean): V | undefined {
    for (const [k, v] of this.entries()) {
      if (fn(v, k)) {
        return v;
      }
    }
    return undefined;
  }
  /**
   * @param fn Function to be passed.
   * @returns A key from the map. If none found, returns undefined.
   */
  findKey(fn: (v: V, k: K) => boolean): K | undefined {
    for (const [k, v] of this.entries()) {
      if (fn(v, k)) {
        return k;
      }
    }
    return undefined;
  }
  /**
   * Get the first element(s) from the map.
   * @param {number} n Number of elements to fetch.
   * @returns The first element / undefined.
   */
  first(): V | undefined;
  first(n: number): V[];
  first(n?: number): V | V[] | undefined {
    if(n && n < 0) return this.last(-n)
    const iter = this.values();
    if (n && n > this.size) return;
    return (typeof n === "number" && !isNaN(n))
      ? Array.from({ length: n }, () => iter.next().value)
      : iter.next().value;
  }
  /**
   * Get the first (n) element's key from the map.
   * @param {number} n Number of elements to fetch.
   * @returns The first element's key / undefined.
   */
  firstKey(): K | undefined;
  firstKey(n: number): K[];
  firstKey(n?: number): K | K[] | undefined {
    if(n && n < 0) return this.firstKey(-n)
    const iter = this.keys();
    if (n && n > this.size) return;
    return (typeof n === "number" && !isNaN(n))
      ? Array.from({ length: n }, () => iter.next().value)
      : iter.next().value;
  }
  /**
   * Convert the key-value pairs into key-value pairs... I mean a JavaScript object.
   * @returns {Record<string, V>}
   */
  json(): Record<string, V> {
    const json: Record<string, V> = {};
    for (const item of this.entries()) {
      json[`${item[0]}`] = item[1];
      //      Object.defineProperty(json, `${item[0]}`, {
      //        value: item[1],
      //     });
    }
    return json;
  }
  /**
   * Return the nth key of the map.
   * @param {number} pos Position to get data.
   * @returns {K} Key at specified index.
   */
  keyAt(pos: number): K | undefined {
    if (pos > (this.size - 1)) pos = pos % (this.size - 1);
    if (pos < 0) pos = (this.size) + (pos % (this.size - 1));
    const val = this.keys();
    for (let i = 0; i < pos; ++i) {
      val.next();
    }
    return val.next().value;
  }
  /**
   * Get last value(s) in the Map.
   */
  last(): V | undefined;
  last(n: number): V[];
  last(n?: number): V | V[] | undefined {
    if(n && n < 0) return this.first(-n)
    const arr = this.array();
    return (typeof n === "number" && !isNaN(n))
      ? arr.slice(-n)
      : arr[arr.length - 1];
  }
  /**
   * Get last key(s) in the Map.
   */
  lastKey(): K | undefined;
  lastKey(n: number): K[];
  lastKey(n?: number): K | K[] | undefined {
    if(n && n < 0) return this.firstKey(-n)
    const arr = this.array(true);
    return (typeof n === "number" && !isNaN(n))
      ? arr.slice(-n)
      : arr[arr.length - 1];
  }

  /**
   * Map the Map into an Array.
   * @param fn Function for mapping.
   * @returns {T[]} Array.
   */
  map<T>(fn: (v: V, k: K) => T): T[] | [] {
    const arr = [];
    for (const [k, v] of this.entries()) {
      arr.push(fn(v, k));
    }
    return arr;
  }
  /**
   * Get a random element from the BetterMap.
   * @returns {boolean} True or false
   */
  random(): V | undefined;
  random(count: number): V[];
  random(count?: number): V | undefined | V[] {
    if (!count) return this.#random();
    const randomArr = [];
    for (let c = count; c > 0; --c) {
      const random = this.#random();
      if (random) randomArr.push(random);
    }
    return randomArr;
  }
  /**
   * Get a random key from the BetterMap.
   * @returns {boolean} True or false
   */
  randomKey(): K | undefined;
  randomKey(count: number): K[];
  randomKey(count?: number): K | undefined | K[] {
    if (!count) return this.#random(true);
    const randomArr = [];
    for (let c = count; c > 0; --c) {
      const random = this.#random(true);
      if (random) randomArr.push(random);
    }
    return randomArr;
  }
  #random(): V | undefined;
  #random(key: boolean): K | undefined;
  #random(key = false): V | K | undefined {
    const max = Math.floor(Math.random() * this.size);
    const iter = key ? this.keys() : this.values();
    for (let i = 0; i < max; ++i) {
      iter.next();
    }
    return iter.next().value;
  }
  /**
   * Reduce data in the map.
   * @param fn Reducer function.
   * @returns {T} Reduced data.
   */
  reduce<T>(fn: (acc: T, val: [K, V]) => T, first: T): T {
    const iter = this.entries();
    let val;
    let result = first === undefined ? iter.next().value : first;
    while ((val = iter.next().value) !== undefined) {
      result = fn(result, val);
    }
    return result;
  }
  /**
   * Check if at least one entry from the Map passes the function.
   * @param fn Function to run on every element.
   * @returns {boolean} True or false
   */
  some(fn: (val: V, key: K) => boolean): boolean {
    for (const [k, v] of this.entries()) {
      if (fn(v, k)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Sort elements in the better map.
   * @param fn Function to use for sorting.
   * @returns {BetterMap<K, V>} sorted BetterMap.
   */
  sort(fn: (v1: V, v2: V, k1: K, k2: K) => number = () => 0): BetterMap<K, V> {
    const items = [...this.entries()];
    items.sort((a, b) => fn(a[1], b[1], a[0], b[0]));
    const newColl = new BetterMap<K, V>(this.name);
    for (const [k, v] of items) {
      newColl.set(k, v);
    }
    return newColl;
  }
  toString(): string {
    return `[BetterMap[${this.size}] of <${this.name}>]`;
  }
  /**
   * Duplicate of BetterMap#json
   * @returns {Record<string, V>}
   */
  toJSON(): Record<string, V> {
    return this.json();
  }
  /**
   * Transform values of the map.
   * Similar to map() but returns a BetterMap instead.
   * @param fn Function for mapping.
   * @returns 
   */
  transform<T>(fn: (v: V, k: K) => T): BetterMap<K, T> {
    const newMap = new BetterMap<K, T>(this.name);
    this.forEach((v, k) => {
      newMap.set(k, fn(v, k))
    })
    return newMap;
  }
  /**
   * Create a new map from an existing Map or an array of key-value pairs
   * @param data Existing Map / Array of Key-Value pairs.
   * @returns {BetterMap<K1, V1>}
   */
  static from<K1, V1>(data: Map<K1, V1> | [K1, V1][]): BetterMap<K1, V1> {
    const returnMap = new BetterMap<K1, V1>();
    if (data instanceof Map) {
      data.forEach((v: V1, k: K1) => returnMap.set(k, v));
    }
    if (Array.isArray(data)) {
      data.forEach(([k, v]) => returnMap.set(k, v));
    }
    return returnMap;
  }
}
