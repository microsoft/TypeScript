//// [tests/cases/conformance/es6/moduleExportsSystem/defaultExportsGetExportedSystem.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var Foo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Foo = class Foo {
            };
            exports_1("default", Foo);
        }
    };
});
//// [b.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    exports_1("default", foo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
