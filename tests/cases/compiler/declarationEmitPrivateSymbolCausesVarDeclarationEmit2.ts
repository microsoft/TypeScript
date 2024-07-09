// @declaration: true
// @lib: es6
// @filename: a.ts
export const x = Symbol();

// @filename: b.ts
import { x } from "./a";

export class C {
  private [x]: number = 1;
}

// @filename: c.ts
import { x } from "./a";
import { C } from "./b";

export class D extends C {
  private [x]: 12 = 12;
}
