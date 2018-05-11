//// [tests/cases/compiler/allowSyntheticDefaultImports6.ts] ////

//// [b.d.ts]
declare class Foo {
	member: string;
}
export = Foo;

//// [a.ts]
import Foo from "./b";
export var x = new Foo();


//// [a.js]
System.register(["./b"], function (exports_1, context_1) {
    var b_1, x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b_1_1) {
                b_1 = b_1_1;
            }
        ],
        execute: function () {
            exports_1("x", x = new b_1["default"]());
        }
    };
});
