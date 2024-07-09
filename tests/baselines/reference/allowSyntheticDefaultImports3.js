//// [tests/cases/compiler/allowSyntheticDefaultImports3.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.ts]
export class Foo {
	member: string;
}


//// [b.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var Foo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Foo = /** @class */ (function () {
                function Foo() {
                }
                return Foo;
            }());
            exports_1("Foo", Foo);
        }
    };
});
//// [a.js]
System.register(["./b"], function (exports_1, context_1) {
    "use strict";
    var b_1, x;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b_1_1) {
                b_1 = b_1_1;
            }
        ],
        execute: function () {
            exports_1("x", x = new b_1.default.Foo());
        }
    };
});
