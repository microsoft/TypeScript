/// <reference path="fourslash.ts" />

////import { A } from "./a";
////import { C } from "./a" assert { type: "a" };
////import { Z } from "./z";
////import { A as D } from "./a" assert { type: "b" };
////import { E } from "./a" with { type: "a" };
////import { F } from "./a" assert { type: "a" };
////import { B } from "./a";
////
////export type G = A | B | C | D | E | F | Z;

verify.organizeImports(
`import { A, B } from "./a";
import { C, F } from "./a" assert { type: "a" };
import { A as D } from "./a" assert { type: "b" };
import { E } from "./a" with { type: "a" };
import { Z } from "./z";

export type G = A | B | C | D | E | F | Z;`);