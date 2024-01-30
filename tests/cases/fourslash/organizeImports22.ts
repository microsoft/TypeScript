/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export interface A { }
////export interface B { }
////export interface C { }
////export interface D { }
////export interface E { }
////export interface F { }

// @filename: /b.ts
////import { A } from "./a";
////import { type B } from "./a";
////import { C } from "./a" assert { type: "a" };
////import { A as D } from "./a" assert { type: "b" };
////import { E } from "./a" with { type: "a" };
////import { A as F } from "./a" with { type: "b" };
////
////export type G = A | B | C | D | E | F;

goTo.file("/b.ts");
verify.organizeImports(
`import { A, type B } from "./a";
import { C } from "./a" assert { type: "a" };
import { A as D } from "./a" assert { type: "b" };
import { E } from "./a" with { type: "a" };
import { A as F } from "./a" with { type: "b" };

export type G = A | B | C | D | E | F;`);
