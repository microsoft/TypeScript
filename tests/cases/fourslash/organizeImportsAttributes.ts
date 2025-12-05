/// <reference path="fourslash.ts" />

//// import { A } from "./file";
//// import { type B } from "./file";
//// import { C } from "./file" assert { type: "a" };
//// import { A as D } from "./file" assert { type: "b" };
//// import { E } from "./file" with { type: "a" };
//// import { A as F } from "./file" with { type: "b" };
//// 
//// type G = A | B | C | D | E | F;

verify.organizeImports(
`import { A, type B } from "./file";
import { C } from "./file" assert { type: "a" };
import { A as D } from "./file" assert { type: "b" };
import { E } from "./file" with { type: "a" };
import { A as F } from "./file" with { type: "b" };

type G = A | B | C | D | E | F;`);
    