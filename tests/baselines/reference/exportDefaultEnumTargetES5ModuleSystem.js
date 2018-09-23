//// [tests/cases/compiler/exportDefaultEnumTargetES5ModuleSystem.ts] ////

//// [a.ts]
// https://github.com/Microsoft/TypeScript/issues/3792

/**
 * export default enum A 1 comment
 */
export default enum A { FOO } // export default enum A 1 trailing comment

/**
 * export default enum A 2 comment
 */
export default enum A {
    BAR = 2
} // export default enum A 2 trailing comment

const enumAUsage = A.FOO;

/**
 * export enum B 1 comment
 */
export enum B {
    X = 0,
} // export enum B 1 trailing comment

// export enum B 2 comment
export enum B {
    Y = 1
} // export enum B 2 trailing comment

const enumBUsage = B.Y

namespace ns {
    // enum ns.C 1 comment
    export enum C {
        X = 0
    } // enum ns.C 1 trailing comment
    // enum ns.C 2 comment
    export enum C {
        Y = 1
    } // enum ns.C 2 trailing comment
}
namespace ns {
    // enum ns.C 3 comment
    export enum C {
        Z = 2
    } // enum ns.C 3 trailing comment

    const enumCUSage1 = C.X;
}

namespace ns {
    const enumCUsage2 = C.X
}

//// [b.ts]
import A, { B } from "./a";

const enumAExternalUsage1 = A.FOO;
const enumAExternalUsage2 = A[enumAExternalUsage1];
const enumBExternalUsage1 = B.X;


//// [a.js]
// https://github.com/Microsoft/TypeScript/issues/3792
System.register([], function (exports_1, context_1) {
    "use strict";
    var A, enumAUsage, B, enumBUsage, ns;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {// https://github.com/Microsoft/TypeScript/issues/3792
            exports_1("A", A = {});
            exports_1("default", A);
            /**
             * export default enum A 1 comment
             */
            (function (A) {
                A[A["FOO"] = 0] = "FOO";
            })(A); // export default enum A 1 trailing comment
            /**
             * export default enum A 2 comment
             */
            (function (A) {
                A[A["BAR"] = 2] = "BAR";
            })(A); // export default enum A 2 trailing comment
            enumAUsage = A.FOO;
            exports_1("B", B = {});
            /**
             * export enum B 1 comment
             */
            (function (B) {
                B[B["X"] = 0] = "X";
            })(B); // export enum B 1 trailing comment
            // export enum B 2 comment
            (function (B) {
                B[B["Y"] = 1] = "Y";
            })(B); // export enum B 2 trailing comment
            enumBUsage = B.Y;
            ns = {};
            (function (ns) {
                // enum ns.C 1 comment
                var C = ns.C || (ns.C = {});
                (function (C) {
                    C[C["X"] = 0] = "X";
                })(C); // enum ns.C 1 trailing comment
                // enum ns.C 2 comment
                (function (C) {
                    C[C["Y"] = 1] = "Y";
                })(C); // enum ns.C 2 trailing comment
            })(ns);
            (function (ns) {
                // enum ns.C 3 comment
                var C = ns.C || (ns.C = {});
                (function (C) {
                    C[C["Z"] = 2] = "Z";
                })(C); // enum ns.C 3 trailing comment
                var enumCUSage1 = C.X;
            })(ns);
            (function (ns) {
                var enumCUsage2 = ns.C.X;
            })(ns);
        }
    };
});
//// [b.js]
System.register(["./a"], function (exports_1, context_1) {
    "use strict";
    var a_1, enumAExternalUsage1, enumAExternalUsage2, enumBExternalUsage1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            enumAExternalUsage1 = a_1.default.FOO;
            enumAExternalUsage2 = a_1.default[enumAExternalUsage1];
            enumBExternalUsage1 = a_1.B.X;
        }
    };
});
