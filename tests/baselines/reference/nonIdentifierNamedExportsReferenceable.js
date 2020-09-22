//// [tests/cases/conformance/types/namedTypes/nonIdentifierNamedExportsReferenceable.ts] ////

//// [a.ts]
export enum Foo {
    "1-1",
    "1-2"
}
//// [b.ts]
import {Foo} from "./a";

export type FooFirst = Foo."1-1";

export type FirstFoo = import("./a").Foo."1-1";


//// [a.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["1-1"] = 0] = "1-1";
    Foo[Foo["1-2"] = 1] = "1-2";
})(Foo = exports.Foo || (exports.Foo = {}));
//// [b.js]
"use strict";
exports.__esModule = true;
