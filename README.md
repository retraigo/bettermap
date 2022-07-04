# BetterMap

An extension of the Map class with more Array-like features.

## Installation

There ain't no installation. It's a Deno module.

## Usage

```ts
import { BetterMap } from "https://deno.land/x/bettermap/mod.ts";

new BetterMap<string, unknown>();
```

class BetterMap<K, V> extends Map<K, V>

  @constructor

  constructor(name?: string)
    Create a new BetterMap

    @param {string} name
        A friendly name for the BetterMap

  name: string
  array(): V[]
    Convert the map into an array of values / keys

    @return
        Array of items in the map

  ### `array(keys: boolean): K[]`
  ### `array(keys): K[] | V[]`
  ### `at(pos: number): V | undefined`
    Return the nth element of the map.

    @param {number} pos
        Position to get data.

    @return {V}
        Item at specified index.

  ### `every(fn: (v: V, k: K) => boolean): boolean`
    Array#every but for a Map

    @param fn
        Function to run on every element.

    @return {boolean}
        True or false

  ### `filter(fn: (v: V, k: K) => boolean): BetterMap<K, V>`
    Array#filter but for a Map

    @param fn
        Function to be passed.

    @return {BetterMap}
        BetterMap with elements that passed.

  ### `find(fn: (v: V, k: K) => boolean): V | undefined`

    @param fn
        Function to be passed.

    @return
        A value from the map. If none found, returns undefined.

  ### `findKey(fn: (v: V, k: K) => boolean): K | undefined`

    @param fn
        Function to be passed.

    @return
        A key from the map. If none found, returns undefined.

  first(): V | undefined
    Get the first element(s) from the map.

    @param {number} n
        Number of elements to fetch.

    @return
        The first element / undefined.

  ### `first(n: number): V[]`
  ### `first(n?: number): V | V[] | undefined`
  firstKey(): K | undefined
    Get the first (n) element's key from the map.

    @param {number} n
        Number of elements to fetch.

    @return
        The first element's key / undefined.

  ### `firstKey(n: number): K[]`
  ### `firstKey(n?: number): K | K[] | undefined`
  json(): Record<string, V>
    Convert the key-value pairs into key-value pairs... I mean a JavaScript object.

    @return {Record<string, V>}
  ### `keyAt(pos: number): K | undefined`
    Return the nth key of the map.

    @param {number} pos
        Position to get data.

    @return {K}
        Key at specified index.

  last(): V | undefined
    Get last value(s) in the Map.
  ### `last(n: number): V[]`
  ### `last(n?: number): V | V[] | undefined`
  lastKey(): K | undefined
    Get last key(s) in the Map.
  ### `lastKey(n: number): K[]`
  ### `lastKey(n?: number): K | K[] | undefined`
  ### `map(fn: (v: V, k: K) => T): T[] | []`
    Map the Map into an Array.

    @param fn
        Function for mapping.

    @return {T[]}
        Array.

  random(): V | undefined
    Get a random element from the BetterMap.

    @return {boolean}
        True or false

  ### `random(count: number): V[]`
  ### `random(count?: number): V | undefined | V[]`
  randomKey(): K | undefined
    Get a random key from the BetterMap.

    @return {boolean}
        True or false

  ### `randomKey(count: number): K[]`
  ### `randomKey(count?: number): K | undefined | K[]`
  ### `reduce(fn: (acc: T, val: [K, V]) => T, first: T): T`
    Reduce data in the map.

    @param fn
        Reducer function.

    @return {T}
        Reduced data.

  ### `some(fn: (val: V, key: K) => boolean): boolean`
    Check if at least one entry from the Map passes the function.

    @param fn
        Function to run on every element.

    @return {boolean}
        True or false

  ### `sort(fn: (v1: V, v2: V, k1: K, k2: K) => number): BetterMap<K, V>`
    Sort elements in the better map.

    @param fn
        Function to use for sorting.

    @return {BetterMap<K, V>}
        sorted BetterMap.

  toString(): string
  toJSON(): Record<string, V>
    Duplicate of BetterMap#json

    @return {Record<string, V>}
  static ### `from(data: Map<K1, V1> | [K1, V1][]): BetterMap<K1, V1>`
    Create a new map from an existing Map or an array of key-value pairs

    @param data
        Existing Map / Array of Key-Value pairs.

    @return {BetterMap<K1, V1>}

## Support
Do open a new issue or pr regarding bugs or improvements.

[Join our Discord server!](https://discord.gg/A69vvdK)