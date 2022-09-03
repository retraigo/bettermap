import Duration from "https://deno.land/x/durationjs@v4.0.0/mod.ts";
import Anime from "./anime.json" assert {
  type: "json",
};

interface CharacterData {
  link: string;
  name: string;
  role: string;
  seiyuu: {
    link?: string;
    name: string;
  };
  gender?: string;
}

import { BetterMap } from "../mod.ts";

const p1 = performance.now();
const b = new BetterMap<string, CharacterData>("Anime Characters");
for (const character of Anime) {
  b.set(`${character.name}`, character);
}

const p2 = performance.now();

console.log(b.filter((a) => !!a.gender).size);
const p3 = performance.now();

console.log(
  b.sort((a, s) => a.gender === s.gender ? 0 : a.gender === "male" ? -1 : 1),
);
const p4 = performance.now();

console.log(b.reduce((gend, [y, x]) => {
  x.gender === "male"
    ? ++gend.male
    : x.gender === "female"
    ? ++gend.female
    : ++gend.unknown;
  return gend;
}, { male: 0, female: 0, unknown: 0 }));
const p5 = performance.now();

console.log(
  "set\t",
  Duration.between(p1, p2).toShortString(["s", "ms", "us", "ns"]),
);
console.log(
  "filter\t",
  Duration.between(p2, p3).toShortString(["s", "ms", "us", "ns"]),
);
console.log(
  "sort\t",
  Duration.between(p3, p4).toShortString(["s", "ms", "us", "ns"]),
);
console.log(
  "reduce\t",
  Duration.between(p4, p5).toShortString(["s", "ms", "us", "ns"]),
);
