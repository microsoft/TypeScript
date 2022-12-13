//// [tests/cases/conformance/es2020/modules/exportAsNamespace4.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as default from './0';

//// [11.ts]
import * as ns from './0';
export default ns;

//// [2.ts]
import foo from './1'
import foo1 from './11'

foo.a;
foo1.a;

foo.b;
foo1.b;

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
            function (_0_1_1) {
                exports_1("default", _0_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//// [11.js]
System.register(["./0"], function (exports_1, context_1) {
    "use strict";
    var ns;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ns_1) {
                ns = ns_1;
            }
        ],
        execute: function () {
            exports_1("default", ns);
        }
    };
});
//// [2.js]
System.register(["./1", "./11"], function (exports_1, context_1) {
    "use strict";
    var _1_1, _11_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1_1_1) {
                _1_1 = _1_1_1;
            },
            function (_11_1_1) {
                _11_1 = _11_1_1;
            }
        ],
        execute: function () {
            _1_1.default.a;
            _11_1.default.a;
            _1_1.default.b;
            _11_1.default.b;
        }
    };
});


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as default from './0';
//// [11.d.ts]
import * as ns from './0';
export default ns;
//// [2.d.ts]
export {};
