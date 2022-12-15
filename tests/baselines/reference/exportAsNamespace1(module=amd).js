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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = exports.a = void 0;
    exports.a = 1;
    exports.b = 2;
});
//// [1.js]
define(["require", "exports", "./0"], function (require, exports, ns) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ns = void 0;
    exports.ns = ns;
    ns.a;
    ns.b;
});
//// [2.js]
define(["require", "exports", "./1"], function (require, exports, foo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    foo.ns.a;
    foo.ns.b;
});


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as ns from './0';
//// [2.d.ts]
export {};
