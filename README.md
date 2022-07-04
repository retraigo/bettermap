# BetterMap

An extension of the Map class with more Array-like features.

## Installation

There ain't no installation. It's a Deno module.

## Usage

```ts
import { BetterMap } from "https://deno.land/x/bettermap/mod.ts";

const b = new BetterMap<string, unknown>();
```

class BetterMap<K, V> extends Map<K, V>

### constructor(name?: string)

Create a new BetterMap

Param: name: string - A friendly name for the BetterMap

Returns: Array of items in the map

### `array(keys: boolean): K[]`

### `array(keys): K[] | V[]`

Convert the map into an array of values / keys

```ts
b.array();
// Array of values
```

### `at(pos: number): V | undefined`

Return the nth element of the map.

Param: pos: number - Position to get data.

Returns: {V} - Item at specified index.

```ts
b.at(-9);
```

```ts
{ name: "Spectrier", tier: "normal", id: 897 }
```

### `every(fn: (v: V, k: K) => boolean): boolean`

Array#every but for a Map

Param: fn - Function to run on every element.

Returns: {boolean} - True or false

```ts
b.every((x) => x.tier === "mythic");
```

```ts
false;
```

### `filter(fn: (v: V, k: K) => boolean): BetterMap<K, V>`

Filter elements that do not pass the condition.

Param: fn - Function to be passed.

Returns: {BetterMap} - BetterMap with elements that passed.

```ts
b.filter((x) => x.tier === "mythic");
```

```ts
Map {
  "Mew" => { name: "Mew", tier: "mythic", id: 151 },
  "Celebi" => { name: "Celebi", tier: "mythic", id: 251 },
  "Jirachi" => { name: "Jirachi", tier: "mythic", id: 385 },
  "Deoxys" => { name: "Deoxys", tier: "mythic", id: 386 },
  "Phione" => { name: "Phione", tier: "mythic", id: 489 },
  "Manaphy" => { name: "Manaphy", tier: "mythic", id: 490 },
  "Darkrai" => { name: "Darkrai", tier: "mythic", id: 491 },
  "Shaymin" => { name: "Shaymin", tier: "mythic", id: 492 },
  "Arceus" => { name: "Arceus", tier: "mythic", id: 493 },
  "Victini" => { name: "Victini", tier: "mythic", id: 494 },
  "Keldeo" => { name: "Keldeo", tier: "mythic", id: 647 },
  "Meloetta" => { name: "Meloetta", tier: "mythic", id: 648 },
  "Genesect" => { name: "Genesect", tier: "mythic", id: 649 },
  "Diancie" => { name: "Diancie", tier: "mythic", id: 719 },
  "Hoopa" => { name: "Hoopa", tier: "mythic", id: 720 },
  "Volcanion" => { name: "Volcanion", tier: "mythic", id: 721 },
  "Magearna" => { name: "Magearna", tier: "mythic", id: 801 },
  "Marshadow" => { name: "Marshadow", tier: "mythic", id: 802 },
  "Zeraora" => { name: "Zeraora", tier: "mythic", id: 807 },
  "Meltan" => { name: "Meltan", tier: "mythic", id: 808 },
  "Melmetal" => { name: "Melmetal", tier: "mythic", id: 809 },
  "Zarude" => { name: "Zarude", tier: "mythic", id: 893 }
}
```

### `find(fn: (v: V, k: K) => boolean): V | undefined`

Param: fn - Function to be passed.

Returns: A value from the map. If none found, returns undefined.

```ts
b.find((x) => x.tier === "mythic");
```

```ts
{ name: "Mew", tier: "mythic", id: 151 }
```

### `findKey(fn: (v: V, k: K) => boolean): K | undefined`

Param: fn - Function to be passed.

Returns: A key from the map. If none found, returns undefined.

```ts
b.findKey((x) => x.tier === "mythic");
```

```ts
"Mew";
```

### `first(): V | undefined`

### `first(n: number): V[]`

### `first(n?: number): V | V[] | undefined`

Get the first element(s) from the map.

Param: n: number - Number of elements to fetch.

Returns: The first element / undefined.

```ts
b.first();
```

```ts
{ name: "Bulbasaur", tier: "normal", id: 1 }
```

### `firstKey(): K | undefined`

Get the first (n) element's key from the map.

Param: n: number - Number of elements to fetch.

Returns: The first element's key / undefined.

```ts
b.first();
```

```ts
"Bulbasaur";
```

### `json(): Record<string, V>`

Convert the key-value pairs into key-value pairs... I mean a JavaScript object.

Returns: {Record<string, V>} - keyAt(pos: number): K | undefined` Return the nth
key of the map.

Param: pos: number - Position to get data.

Returns: {K} - Key at specified index.

### `last(): V | undefined`

### `last(n: number): V[]`

### `last(n?: number): V | V[] | undefined`

Get last value(s) in the Map.

```ts
b.last();
```

```ts
{ name: "Enamorus", tier: "normal", id: 905 }
```

### `lastKey(): K | undefined`

### `lastKey(n: number): K[]`

### `lastKey(n?: number): K | K[] | undefined`

Get last key(s) in the Map.

```ts
b.first();
```

```ts
"Enamorus";
```

### `map(fn: (v: V, k: K) => T): T[] | []`

Map the Map into an Array.

Param: fn - Function for mapping.

Returns: {T[]} - Array.

```ts
b.map((x) => x.id);
```

### `random(): V | undefined`

### `random(count: number): V[]`

### `random(count?: number): V | undefined | V[]`

Get a random element from the BetterMap.

Returns: {boolean} - True or false

```ts
b.random();
b.random(5);
```

### `randomKey(): K | undefined`

Get a random key from the BetterMap.

Returns: {boolean} - True or false

### `randomKey(count: number): K[]`

### `randomKey(count?: number): K | undefined | K[]`

### `reduce(fn: (acc: T, val: [K, V]) => T, first: T): T`

Reduce data in the map.

Param: fn - Reducer function.

Returns: {T} - Reduced data.

```ts
b.randomKey();
b.randomKey(5);
```

### `some(fn: (val: V, key: K) => boolean): boolean`

Check if at least one entry from the Map passes the function.

Param: fn - Function to run on every element.

Returns: {boolean} - True or false

```ts
b.some((x) => x.tier === "mythic");
```

```ts
true;
```

### `sort(fn: (v1: V, v2: V, k1: K, k2: K) => number): BetterMap<K, V>`

Sort elements in the better map.

Param: fn - Function to use for sorting.

Returns: {BetterMap<K, V>} - sorted BetterMap.

```ts
b.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
```

```ts
Map {
  "Abomasnow" => { name: "Abomasnow", tier: "normal", id: 460 },
  "Abra" => { name: "Abra", tier: "normal", id: 63 },
  "Absol" => { name: "Absol", tier: "normal", id: 359 },
  "Accelgor" => { name: "Accelgor", tier: "normal", id: 617 },
  "Aegislash" => { name: "Aegislash", tier: "normal", id: 681 },
  "Aerodactyl" => { name: "Aerodactyl", tier: "normal", id: 142 },
  "Aggron" => { name: "Aggron", tier: "normal", id: 306 },
  "Aipom" => { name: "Aipom", tier: "normal", id: 190 },
  "Alakazam" => { name: "Alakazam", tier: "normal", id: 65 },
  "Alcremie" => { name: "Alcremie", tier: "normal", id: 869 },
  "Alomomola" => { name: "Alomomola", tier: "normal", id: 594 },
  ...
}
```

### `toString(): string`

Stringify the map.

### `toJSON(): Record<string, V>`

Duplicate of BetterMap#json

Returns: {Record<string, V>} -

### `transform(fn: (v: V, k: K) => T): BetterMap<K, T>`

Transform values of the map.
Similar to `map()` but returns a BetterMap instead.

Param: fn - Function for mapping.

Returns: BetterMap<K, T>

### static `from(data: Map<K1, V1> | [K1, V1][]): BetterMap<K1, V1>`

Create a new map from an existing Map or an array of key-value pairs

Param: data - Existing Map / Array of Key-Value pairs.

Returns: {BetterMap<K1, V1>}

```ts
const obj = {
  "Mew": { name: "Mew", tier: "mythic", id: 151 },
  "Celebi": { name: "Celebi", tier: "mythic", id: 251 },
  "Jirachi": { name: "Jirachi", tier: "mythic", id: 385 },
};

BetterMap.from(Object.entries(obj))
```
```ts
Map {
  "Mew" => { name: "Mew", tier: "mythic", id: 151 },
  "Celebi" => { name: "Celebi", tier: "mythic", id: 251 },
  "Jirachi" => { name: "Jirachi", tier: "mythic", id: 385 },
}
```

# Support

Do open a new issue or pr regarding bugs or improvements.

[Join our Discord server!](https://discord.gg/A69vvdK)
