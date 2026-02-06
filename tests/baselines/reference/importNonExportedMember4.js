//// [tests/cases/compiler/importNonExportedMember4.ts] ////

//// [a.ts]
class Foo {}
export = Foo;

//// [b.ts]
import { Foo } from './a';

//// [a.js]
"use strict";
class Foo {
}
module.exports = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
