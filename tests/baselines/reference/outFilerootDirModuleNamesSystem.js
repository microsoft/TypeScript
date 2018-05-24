//// [tests/cases/conformance/es6/moduleExportsSystem/outFilerootDirModuleNamesSystem.ts] ////

//// [a.ts]
import foo from "./b";
export default class Foo {}
foo();

//// [b.ts]
import Foo from "./a";
export default function foo() { new Foo(); }


//// [output.js]
System.register("b", ["a"], function (exports_1, context_1) {
    var a_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { new a_1.default(); }
    exports_1("default", foo);
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("a", ["b"], function (exports_2, context_2) {
    var b_1, Foo;
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (b_1_1) {
                b_1 = b_1_1;
            }
        ],
        execute: function () {
            Foo = class Foo {
            };
            exports_2("default", Foo);
            b_1.default();
        }
    };
});
