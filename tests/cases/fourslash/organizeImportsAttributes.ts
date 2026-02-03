/// <reference path="fourslash.ts" />

//// import { A } from "./file";
//// import { type B } from "./file";
//// import { C } from "./file" with { type: "a" };
//// import { A as D } from "./file" with { type: "b" };
//// import { E } from "./file" with { type: "a" };
//// import { A as F } from "./file" with { type: "b" };
//// 
//// type G = A | B | C | D | E | F;

verify.organizeImports(
`import { A, type B } from "./file";
import { C, E } from "./file" with { type: "a" };
import { A as D, A as F } from "./file" with { type: "b" };

type G = A | B | C | D | E | F;`);
    