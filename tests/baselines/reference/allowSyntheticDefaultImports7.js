//// [tests/cases/compiler/allowSyntheticDefaultImports7.ts] ////

//// [b.d.ts]
export function foo();

export function bar();

//// [a.ts]
import { default as Foo } from "./b";
Foo.bar();
Foo.foo();

//// [a.js]
System.register(["./b"], function (exports_1, context_1) {
    var b_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b_1_1) {
                b_1 = b_1_1;
            }
        ],
        execute: function () {
            b_1["default"].bar();
            b_1["default"].foo();
        }
    };
});
