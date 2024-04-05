/// <reference path="fourslash.ts" />

////import { A } from "./a" assert { foo: "foo", bar: "bar" };
////import { B } from "./a" assert { bar: "bar", foo: "foo" };
////import { D } from "./a" assert { bar: "foo", foo: "bar" };
////import { E } from "./a" assert { foo: 'bar', bar: "foo" };
////import { C } from "./a" assert { foo: "bar", bar: "foo" };
////import { F } from "./a" assert { foo: "42" };
////import { Y } from "./a" assert { foo: 42 };
////import { Z } from "./a" assert { foo: "42" };
////
////export type G = A | B | C | D | E | F | Y | Z;


verify.organizeImports(
`import { A, B } from "./a" assert { foo: "foo", bar: "bar" };
import { C, D, E } from "./a" assert { bar: "foo", foo: "bar" };
import { F, Z } from "./a" assert { foo: "42" };
import { Y } from "./a" assert { foo: 42 };

export type G = A | B | C | D | E | F | Y | Z;`);