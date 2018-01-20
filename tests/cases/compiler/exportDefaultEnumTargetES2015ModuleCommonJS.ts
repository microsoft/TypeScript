// https://github.com/Microsoft/TypeScript/issues/3792
// @target: es2015
// @module: commonjs
// @Filename: a.ts

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

// @Filename: b.ts
import A, { B } from "./a";

const enumAExternalUsage1 = A.FOO;
const enumAExternalUsage2 = A[enumAExternalUsage1];
const enumBExternalUsage1 = B.X;
