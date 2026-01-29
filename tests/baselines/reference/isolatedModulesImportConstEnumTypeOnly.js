//// [tests/cases/compiler/isolatedModulesImportConstEnumTypeOnly.ts] ////

//// [enum.ts]
export const enum Foo { Bar }

//// [index.ts]
import { Foo } from "./enum";
function f(foo: Foo) { return; }


//// [enum.js]
export var Foo;
(function (Foo) {
    Foo[Foo["Bar"] = 0] = "Bar";
})(Foo || (Foo = {}));
//// [index.js]
function f(foo) { return; }
export {};
