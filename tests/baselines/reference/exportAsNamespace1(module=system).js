//// [tests/cases/conformance/es2020/modules/exportAsNamespace1.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as ns from './0';
ns.a;
ns.b;

//// [2.ts]
import * as foo from './1'

foo.ns.a;
foo.ns.b;

//// [0.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var a, b;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("a", a = 1);
            exports_1("b", b = 2);
        }
    };
});
//// [1.js]
System.register(["./0"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ns_1) {
                exports_1("ns", ns_1);
            }
        ],
        execute: function () {
            ns.a;
            ns.b;
        }
    };
});
//// [2.js]
System.register(["./1"], function (exports_1, context_1) {
    "use strict";
    var foo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (foo_1) {
                foo = foo_1;
            }
        ],
        execute: function () {
            foo.ns.a;
            foo.ns.b;
        }
    };
});


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as ns from './0';
//// [2.d.ts]
export {};
