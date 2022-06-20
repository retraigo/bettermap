import Pokemon from "https://deno.land/x/fortuna@v1.1.2/testdata/pokemon.json" assert {
  type: "json",
};

interface PokemonData {
    name: string,
    id: number,
    tier: string,
}

import { BetterMap } from "./mod.ts"

const b = new BetterMap<string, PokemonData>("Pokemon")
for(const pokemon of Pokemon) {
    b.set(`${pokemon.name}`, pokemon)
}

console.log(JSON.stringify(b))