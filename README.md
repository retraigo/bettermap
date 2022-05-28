# BetterMap

An extension of the Map class with more Array-like features.

## Installation

There ain't no installation. It's a Deno module.

## Usage

```ts
import { BetterMap } from "https://deno.land/x/bettermap/mod.ts";

new BetterMap<string, unknown>();
```

## Contructor

```ts
class BetterMap<K, V> extends Map<K, V>
```

### constructor(name?: string)

Create a new BetterMap

@param {`string`} name
    - A friendly name for the BetterMap

## Methods

### array()

Convert the map into an array of values

@return
    Array of items in the map

### every(fn: (v: V, k: K) => boolean): boolean

Array#every but for a Map

@param fn
    - Function to run on every element.

@return {`boolean`}
    True or false

### filter(fn: (v: V, k: K) => boolean): BetterMap<K, V>

Array#filter but for a Map

@param fn
    - Function to be passed.

@return {`BetterMap`}
    BetterMap with elements that passed.

### find(fn: (v: V, k: K) => boolean): V | undefined

@param fn
    - Function to be passed.

@return
    A value from the map. If none found, returns undefined.

### first(): V | undefined

Get the first element from the map.

@return
    The first element / undefined.

### firstKey(): K | undefined

Get the first element's key from the map.

@return
    The first element's key / undefined.

### json(): Record<string, unknown>

Convert the key-value pairs into key-value pairs... I mean a JavaScript object.

@return {`Record<string, unknown>`}

### map(fn: (v: V, k: K) => T): T[] | []

Map the Map into an Array.

@param fn
    - Function for mapping.

@return {`T[]`}
    Array.

### random(count): V | undefined | V[] | []

Get a random element from the BetterMap.

@param fn
    - Function to run on every element.

@return {`boolean`}
    True or false

### reduce(fn: (acc: T, val: V) => T, first: T): T

Array#reduce but for a Map

@param fn
    - Reducer function.

@return {`T`}
    Reduced data.

### some(fn: (val: V, key: K) => boolean): boolean

Array#some but for a Map

@param fn
    - Function to run on every element.

@return {`boolean`}
    True or false

### sort(fn: (v1: V, v2: V, k1: K, k2: K) => number): BetterMap<K, V>

Sort elements in the better map.

@param fn
    - Function to use for sorting.

@return {`BetterMap<K, V>`}
    sorted BetterMap.

### toString(): string

### toJSON(): Record<string, unknown>

Duplicate of BetterMap#json

@return {`Record<string, unknown>`}

### static from(data: Map<K1, V1> | [K1, V1][]): BetterMap<K1, V1>
Create a new map from an existing Map or an array of key-value pairs.

## Support
Do open a new issue or pr regarding bugs or improvements.

[Join our Discord server!](https://discord.gg/A69vvdK)