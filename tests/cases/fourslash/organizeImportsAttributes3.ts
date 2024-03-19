/// <reference path="fourslash.ts" />

////import { A } from "./a";
////import { C } from "./a" assert {      type: "a" };
////import { Z } from "./z";
////import { A as D } from "./a" assert    { type: "b" };
////import { E } from "./a" assert { type: /* comment*/ "a"              };
////import { F } from "./a" assert     {type: "a" };
////import { Y } from "./a"   assert{ type: "b" /* comment*/};
////import { B } from "./a";
////
////export type G = A | B | C | D | E | F | Y | Z;

verify.organizeImports(
`import { A, B } from "./a";
import { C, E, F } from "./a" assert { type: "a" };
import { A as D, Y } from "./a" assert { type: "b" };
import { Z } from "./z";

export type G = A | B | C | D | E | F | Y | Z;`);