//// [tests/cases/conformance/es6/moduleExportsSystem/defaultExportsGetExportedSystem.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
System.register([], function(exports_1) {
    "use strict";
    var Foo;
    return {
        setters:[],
        execute: function() {
            class Foo {
            }
            exports_1("default", Foo);
        }
    }
});
//// [b.js]
System.register([], function(exports_1) {
    "use strict";
    function foo() { }
    exports_1("default", foo);
    return {
        setters:[],
        execute: function() {
        }
    }
});
