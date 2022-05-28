/**
 * @class BetterMap
 */
export class BetterMap<K, V> extends Map<K, V> {
  name: string;
  /**
   * Create a new BetterMap
   * @param {string} name - A friendly name for the BetterMap
   */
  constructor(name?: string) {
    super();
    this.name = typeof name === "string" ? name : "unknown items";
  }
  /**
   * Convert the map into an array of values
   * @returns Array of items in the map
   */
  array() {
    return this.map((x) => x);
  }
  /**
   * Array#every but for a Map
   * @param fn - Function to run on every element.
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
   * @param fn - Function to be passed.
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
   * @param fn - Function to be passed.
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
   * Get the first element from the map.
   * @returns The first element / undefined.
   */
  first(): V | undefined {
    return this.values().next().value;
  }
  /**
   * Get the first element's key from the map.
   * @returns The first element's key / undefined.
   */
  firstKey(): K | undefined {
    return this.keys().next().value;
  }
  /**
   * Convert the key-value pairs into key-value pairs... I mean a JavaScript object.
   * @returns {Record<string, unknown>}
   */
  json(): Record<string, unknown> {
    const json = {};
    for (const item of this.entries()) {
      Object.defineProperty(json, `${item[0]}`, {
        value: item[1],
        writable: true,
      });
    }
    return json;
  }
  /**
   * Map the Map into an Array.
   * @param fn - Function for mapping.
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
   * @param fn - Function to run on every element.
   * @returns {boolean} True or false
   */
  random(count = 1): V | undefined | V[] | [] {
    if (count === 1) return this.#random();
    const randomArr = [];
    for (let c = count; c > 0; --c) {
      const random = this.#random();
      if (random) randomArr.push(random);
    }
    return randomArr;
  }
  #random(): V | undefined {
    const max = Math.floor(Math.random() * this.size);
    const iter = this.values();
    for (let i = 0; i < max; ++i) {
      iter.next();
    }
    return iter.next().value;
  }
  /**
   * Array#reduce but for a Map
   * @param fn - Reducer function.
   * @returns {T} Reduced data.
   */
  reduce<T>(fn: (acc: T, val: V) => T, first: T): T {
    const iter = this.values();
    let val;
    let result = first === undefined ? iter.next().value : first;
    while ((val = iter.next().value) !== undefined) {
      result = fn(result, val);
    }
    return result;
  }
  /**
   * Array#some but for a Map
   * @param fn - Function to run on every element.
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
   * @param fn - Function to use for sorting.
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
   * @returns {Record<string, unknown>}
   */
  toJSON(): Record<string, unknown> {
    return this.json();
  }
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
