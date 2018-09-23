//// [tests/cases/compiler/exportDefaultNamespace.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792

/**
 * namespace A 1 leading comment
 */
export default namespace A {
    export const A1 = 42;
} // namespace A 1 trailing comment

/**
 * namespace A 2 leading comment
 */
export default namespace A {
    export function A2() {
        return 0xC0FFEE;
    }
} // namespace A 2 trailing comment

const namespaceAUsage1 = A.A1;

/**
 * namespace B 1 leading comment
 */
export namespace B {
    export const B1 = 42;
} // namespace B 1 trailing comment

/**
 * namespace B 2 leading comment
 */
export namespace B {
    export function B2() {
        return 0xC0FFEE;
    }
} // namespace B 2 trailing comment

const namespaceBUsage1 = B.B2();

namespace ns {
    /**
     * namespace C 1 leading comment
     */
    export namespace C {
        export const C1 = 42;
    } // namespace C 1 trailing comment

    /**
     * namespace C 2 leading comment
     */
    export namespace C {
        export function C2() {
            return 0xC0FFEE;
        }
    } // namespace C 2 trailing comment

    const namespaceCUsage1 = C.C1;
}

namespace ns {
    /**
     * namespace C 3 leading comment
     */
    export namespace C {
        export class C3 { }
    } // namespace C 3 trailing comment
}

namespace ns {
    const namespaceCUsage2 = C.C1;
}


//// [b.ts]
import A, { B } from './a';

const namespaceAExternalUsage1 = A.A1;
const namespaceBExternalUsage1 = B.B2;

//// [a.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/3792
exports.__esModule = true;
/**
 * namespace A 1 leading comment
 */
var A = {};
exports["default"] = A;
(function (A) {
    A.A1 = 42;
})(A); // namespace A 1 trailing comment
/**
 * namespace A 2 leading comment
 */
(function (A) {
    function A2() {
        return 0xC0FFEE;
    }
    A.A2 = A2;
})(A); // namespace A 2 trailing comment
var namespaceAUsage1 = A.A1;
/**
 * namespace B 1 leading comment
 */
var B = {};
(function (B) {
    B.B1 = 42;
})(B); // namespace B 1 trailing comment
/**
 * namespace B 2 leading comment
 */
(function (B) {
    function B2() {
        return 0xC0FFEE;
    }
    B.B2 = B2;
})(B); // namespace B 2 trailing comment
var namespaceBUsage1 = B.B2();
var ns = {};
(function (ns) {
    /**
     * namespace C 1 leading comment
     */
    var C = ns.C || (ns.C = {});
    (function (C) {
        C.C1 = 42;
    })(C); // namespace C 1 trailing comment
    /**
     * namespace C 2 leading comment
     */
    (function (C) {
        function C2() {
            return 0xC0FFEE;
        }
        C.C2 = C2;
    })(C); // namespace C 2 trailing comment
    var namespaceCUsage1 = C.C1;
})(ns);
(function (ns) {
    /**
     * namespace C 3 leading comment
     */
    var C = ns.C || (ns.C = {});
    (function (C) {
        var C3 = /** @class */ (function () {
            function C3() {
            }
            return C3;
        }());
        C.C3 = C3;
    })(C); // namespace C 3 trailing comment
})(ns);
(function (ns) {
    var namespaceCUsage2 = ns.C.C1;
})(ns);
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var namespaceAExternalUsage1 = a_1["default"].A1;
var namespaceBExternalUsage1 = a_1.B.B2;
