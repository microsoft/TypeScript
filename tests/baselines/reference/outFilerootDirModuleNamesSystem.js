//// [tests/cases/conformance/es6/moduleExportsSystem/outFilerootDirModuleNamesSystem.ts] ////

//// [a.ts]
import foo from "./b";
export default class Foo {}
foo();

//// [b.ts]
import Foo from "./a";
export default function foo() { new Foo(); }

// https://github.com/microsoft/TypeScript/issues/37429
import("./a");


//// [output.js]
System.register("b", ["a"], function (exports_1, context_1) {
    "use strict";
    var a_1;
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
            // https://github.com/microsoft/TypeScript/issues/37429
            context_1.import("a");
        }
    };
});
System.register("a", ["b"], function (exports_2, context_2) {
    "use strict";
    var b_1, Foo;
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
