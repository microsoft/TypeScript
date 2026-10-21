//// [tests/cases/compiler/typeOnlyUnresolvedDefaultImportReexport.ts] ////

//// [a.d.ts]
import type Foo from "./missing";
export { Foo };

//// [main.ts]
import { Foo } from "./a";
const x = Foo;


//// [main.js]
import { Foo } from "./a";
const x = Foo;
