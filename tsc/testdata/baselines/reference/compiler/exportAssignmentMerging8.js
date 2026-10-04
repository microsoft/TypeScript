//// [tests/cases/compiler/exportAssignmentMerging8.ts] ////

//// [a.ts]
type SomeTypeAlias = { x: string };
class Foo {}
export = Foo;
export { SomeTypeAlias };
//// [b.ts]
import { SomeTypeAlias } from "./a";
const value: SomeTypeAlias = { x: "ok" };



//// [a.js]
"use strict";
class Foo {
}
module.exports = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value = { x: "ok" };


//// [a.d.ts]
type SomeTypeAlias = {
    x: string;
};
declare class Foo {
}
export = Foo;
export { SomeTypeAlias };
//// [b.d.ts]
export {};
