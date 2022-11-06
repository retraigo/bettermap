/**
 * @class BetterMap
 */
export class BetterMap<K, V> extends Map<K, V> {
  name: string;
  /**
   * Create a new BetterMap
   * @example
   * ```ts
   * const map1 = new BetterMap();
   * const map2 = new BetterMap<string, number>();
   * const map3 = new BetterMap<string, number>("People");
   * ```
   * @param {string} name A friendly name for the BetterMap
   */
  constructor(name?: string) {
    super();
    this.name = typeof name === "string" ? name : "unknown items";
  }
  /**
   * Convert the map into an array of values / keys
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.array());
   * ```
   * @returns Array of items in the map
   */
  array(): V[];
  array(keys: boolean): K[];
  array(keys = false): K[] | V[] {
    return keys ? this.map<K>((_: V, x: K) => x) : this.map<V>((x: V) => x);
  }
  /**
   * Return the nth element of the map.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.at(-1)); // 28
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.every(v => v > 10)); // false
   * console.log(map.every((_v, k) => k.startsWith("Dora"))); // true
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.filter(v => v > 10));
   * console.log(map.filter((_v, k) => k.startsWith("Dora")))
   * ```
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
   * Find an element from the Map.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.find(v => v > 10)); // 28
   * ```
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
   * Find a key from the Map.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.findKey(v => v > 10)); // Dora
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.first()); // 10
   * ```
   * @param {number} n Number of elements to fetch.
   * @returns The first element / undefined.
   */
  first(): V | undefined;
  first(n: number): V[];
  first(n?: number): V | V[] | undefined {
    if (n && n < 0) return this.last(-n);
    const iter = this.values();
    if (n && n > this.size) return;
    return (typeof n === "number" && !isNaN(n))
      ? Array.from({ length: n }, () => iter.next().value)
      : iter.next().value;
  }
  /**
   * Get the first (n) element's key from the map.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.firstKey()); // Doraemon
   * ```
   * @param {number} n Number of elements to fetch.
   * @returns The first element's key / undefined.
   */
  firstKey(): K | undefined;
  firstKey(n: number): K[];
  firstKey(n?: number): K | K[] | undefined {
    if (n && n < 0) return this.firstKey(-n);
    const iter = this.keys();
    if (n && n > this.size) return;
    return (typeof n === "number" && !isNaN(n))
      ? Array.from({ length: n }, () => iter.next().value)
      : iter.next().value;
  }
  /**
   * Convert the key-value pairs into key-value pairs... I mean a JavaScript object.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.json());
   * // {Doraemon: 10, Dora: 28}
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.keyAt(-1)); // Dora
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.last()); // 28
   * ```
   */
  last(): V | undefined;
  last(n: number): V[];
  last(n?: number): V | V[] | undefined {
    if (n && n < 0) return this.first(-n);
    const arr = this.array();
    return (typeof n === "number" && !isNaN(n))
      ? arr.slice(-n)
      : arr[arr.length - 1];
  }
  /**
   * Get last key(s) in the Map.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.lastKey()); // Dora
   * ```
   */
  lastKey(): K | undefined;
  lastKey(n: number): K[];
  lastKey(n?: number): K | K[] | undefined {
    if (n && n < 0) return this.firstKey(-n);
    const arr = this.array(true);
    return (typeof n === "number" && !isNaN(n))
      ? arr.slice(-n)
      : arr[arr.length - 1];
  }

  /**
   * Map the Map into an Array.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.map(v => v - 10)); // [0, 18]
   * console.log(map.every((v, k) => k+v))); // ["Doraemon10", "Dora28"]
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.random());
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.randomKey());
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.reduce((acc, val) => acc + (val[1] > 10 ? "a" : "b") + val[0], ""));
   * // bDoraemonaDora
   * ```
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
   * Shift all elements `n` places to the left. Warps around the map.
   * @example
   * ```ts
   * import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
   *   type: "json",
   * };
   *
   * interface PokemonData {
   *   name: string;
   *   id: number;
   *   tier: string;
   * }
   * 
   * const c = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(50, 150)) {
   *   c.set(`${pokemon.name}`, pokemon);
   * }
   *
   * console.log(c.shift(7)) // Shift elements 7 places to the left.
   * console.log(c.shift(-7)) // Shift elements 7 places to the right.
   * ```
   * @param n Number of places to shift.
   */
  shift(n: number): BetterMap<K, V> {
    if (n > (this.size - 1)) n = n % (this.size - 1);
    if (n < 0) n = (this.size) + (n % (this.size - 1));
    const returnMap = new BetterMap<K, V>(this.name);
    const data = this.entries();
    const tail: [K, V][] = [];
    while (n > 0) {
      tail.push(data.next().value);
      n -= 1;      
    }
    while (true) {
      const val = data.next();
      if(val.done) {
        if(val.value) {
          returnMap.set(val.value[0], val.value[1])
        }
        break;
      }
      returnMap.set(val.value[0], val.value[1])
    }
    for(const [k, v] of tail) {
      returnMap.set(k, v)
    }
    return returnMap;
  }
  /**
   * Shuffle the elements in the Map.
   * @returns Shuffled map.
   */
  shuffle(): BetterMap<K, V> {
    return this.sort((_) => Math.random() - 0.5);
  }
  /**
   * Return a portion of the Map.
   * @param start 
   * @param end 
   * @returns 
   */
  slice(start = 0, end = this.size): BetterMap<K, V> {
    return BetterMap.from(Array.from(this.entries()).slice(start, end));
  }
  /**
   * Check if at least one entry from the Map passes the function.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.some(v => v > 10)); // True
   * console.log(map.some(_v, k) => k.startsWith("Doras"))); // False
   * ```
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
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * map.set("Pikachu", 7);
   * console.log(map.sort((v1, v2) => v1 - v2)); // Sorts in the order Pikachu -> Doraemon -> Dora.
   * ```
   * @param fn Function to use for sorting.
   * @returns {BetterMap<K, V>} sorted BetterMap.
   */
  sort(fn: (v1: V, v2: V, k1: K, k2: K) => number = () => 0): BetterMap<K, V> {
    const items = Array.from(this.entries());
    items.sort((a, b) => fn(a[1], b[1], a[0], b[0]));
    const newColl = new BetterMap<K, V>(this.name);
    for (const [k, v] of items) {
      newColl.set(k, v);
    }
    return newColl;
  }
  /**
   * Split the Map into two Maps using a filtering function.
   * @example
   * ```ts
   * const map = new BetterMap<string, number>("People");
   * map.set("Doraemon", 10);
   * map.set("Dora", 28);
   * console.log(map.split(v => v > 10));
   * // [{Doraemon => 28}, {Doraemon => 10}]
   * ```
   * @param fn Function to be passed.
   * @returns An array of two maps: First map containing elements that passed and second map containing elements that didn't pass.
   */
  split(fn: (v: V, k: K) => boolean): [BetterMap<K, V>, BetterMap<K, V>] {
    const newCollPassed = new BetterMap<K, V>(this.name);
    const newCollNotPassed = new BetterMap<K, V>(this.name);
    for (const [key, val] of this.entries()) {
      if (fn(val, key)) {
        newCollPassed.set(key, val);
      } else newCollNotPassed.set(key, val);
    }
    return [newCollPassed, newCollNotPassed];
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
   * Similar to `map()` but returns a BetterMap instead.
   * Check `map()` for usage.
   * @param fn Function for mapping.
   * @returns
   */
  transform<T>(fn: (v: V, k: K) => T): BetterMap<K, T> {
    const newMap = new BetterMap<K, T>(this.name);
    this.forEach((v, k) => {
      newMap.set(k, fn(v, k));
    });
    return newMap;
  }
  /**
   * Add all non-similar keys from another Map to this Map.
   * @example
   * ```ts
   * import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
   *   type: "json",
   * };
   *
   * interface PokemonData {
   *   name: string;
   *   id: number;
   *   tier: string;
   * }
   *
   * const b = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(0, 100)) {
   *   b.set(`${pokemon.name}`, pokemon);
   * }
   *
   * const c = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(50, 150)) {
   *   c.set(`${pokemon.name}`, pokemon);
   * }
   *
   * console.log(c.size)
   * c.combine(b)
   * console.log(c.size)
   * ```
   * @param maps Map to combine with this instance.
   * @returns The modified Map.
   */
  combine(...maps: Map<K, V>[]): BetterMap<K, V> {
    for (const map of maps) {
      for (const entry of map.entries()) {
        if (!this.has(entry[0])) this.set(entry[0], entry[1]);
      }
    }
    return this;
  }
  /**
   * Create a new map from an existing Map or an array of key-value pairs.
   * @example
   * ```ts
   * import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
   *   type: "json",
   * };
   *
   * interface PokemonData {
   *   name: string;
   *   id: number;
   *   tier: string;
   * }
   *
   * const b = BetterMap.from(Pokemon.map(x => [x.name, x]))
   * console.log(b)
   * ```
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
  /**
   * A special case of Bettermap#from where the input is a Record.
   * @param data A record.
   * @returns Record converted into a BetterMap.
   */
  static fromRecord<K1 extends string | number | symbol, V1>(
    data: Record<K1, V1>,
  ): BetterMap<K1, V1> {
    const returnMap = new BetterMap<K1, V1>();
    for (const key in data) {
      returnMap.set(key, data[key]);
    }
    return returnMap;
  }

  /**
   * Return the union of two maps. Maps are united by key and not by value.
   * @example
   * ```ts
   * import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
   *   type: "json",
   * };
   *
   * interface PokemonData {
   *   name: string;
   *   id: number;
   *   tier: string;
   * }
   *
   * const b = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(0, 100)) {
   *   b.set(`${pokemon.name}`, pokemon);
   * }
   *
   * const c = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(50, 150)) {
   *   c.set(`${pokemon.name}`, pokemon);
   * }
   *
   * console.log(c.size, b.size)
   * const a = BetterMap.union(c, b)
   * console.log(a.size)
   * ```
   * @param maps Maps to combine.
   * @returns The modified Map.
   */
  static union<K1, V1>(
    ...maps: Map<K1, V1>[]
  ): BetterMap<K1, V1> {
    // TODO: Check value matches for union.
    const newMap = maps[0] instanceof BetterMap
      ? maps[0]
      : BetterMap.from(maps[0]);
    maps.shift();
    for (const map of maps) {
      for (const entry of map.entries()) {
        if (!newMap.has(entry[0])) newMap.set(entry[0], entry[1]);
      }
    }
    return newMap;
  }
  /**
   * Return a Map with elements common to all maps supplied in the parameters.
   * @example
   * ```ts
   * import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
   *   type: "json",
   * };
   *
   * interface PokemonData {
   *   name: string;
   *   id: number;
   *   tier: string;
   * }
   *
   * const b = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(0, 100)) {
   *   b.set(`${pokemon.name}`, pokemon);
   * }
   *
   * const c = new BetterMap<string, PokemonData>("Pokemon");
   * for (const pokemon of Pokemon.slice(50, 150)) {
   *   c.set(`${pokemon.name}`, pokemon);
   * }
   *
   * console.log(c.size, b.size)
   * const a = BetterMap.intersect(c, b)
   * console.log(a.size)
   * ```
   * @param maps Maps to intersect.
   * @returns BetterMap as an intersection of all provided Maps.
   */
  static intersect<K1, V1>(
    ...maps: Map<K1, V1>[]
  ): BetterMap<K1, V1> {
    const newMap = maps[0] instanceof BetterMap
      ? maps[0]
      : BetterMap.from(maps[0]);
    maps.shift();
    const result = newMap.filter((_v, k) => maps.every((map) => map.has(k)));
    return result;
  }
}
