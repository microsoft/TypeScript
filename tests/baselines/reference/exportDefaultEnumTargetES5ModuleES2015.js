//// [tests/cases/compiler/exportDefaultEnumTargetES5ModuleES2015.ts] ////

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
/**
 * export default enum A 1 comment
 */
export default var A = {};
export default A;
(function (A) {
    A[A["FOO"] = 0] = "FOO";
})(A); // export default enum A 1 trailing comment
/**
 * export default enum A 2 comment
 */
(function (A) {
    A[A["BAR"] = 2] = "BAR";
})(A); // export default enum A 2 trailing comment
var enumAUsage = A.FOO;
/**
 * export enum B 1 comment
 */
export var B = {};
export { B };
(function (B) {
    B[B["X"] = 0] = "X";
})(B); // export enum B 1 trailing comment
// export enum B 2 comment
(function (B) {
    B[B["Y"] = 1] = "Y";
})(B); // export enum B 2 trailing comment
var enumBUsage = B.Y;
var ns = {};
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
//// [b.js]
import A, { B } from "./a";
var enumAExternalUsage1 = A.FOO;
var enumAExternalUsage2 = A[enumAExternalUsage1];
var enumBExternalUsage1 = B.X;
