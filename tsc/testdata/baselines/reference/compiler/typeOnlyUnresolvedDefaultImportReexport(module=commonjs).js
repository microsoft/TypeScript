//// [tests/cases/compiler/typeOnlyUnresolvedDefaultImportReexport.ts] ////

//// [a.d.ts]
import type Foo from "./missing";
export { Foo };

//// [main.ts]
import { Foo } from "./a";
const x = Foo;


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = Foo;
