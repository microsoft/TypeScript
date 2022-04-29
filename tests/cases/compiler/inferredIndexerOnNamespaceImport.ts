// @filename: foo.ts
export const x = 3;
export const y = 5;

// @filename: bar.ts
import * as foo from "./foo";

function f(map: { [k: string]: number }) {
  // ...
}

f(foo);