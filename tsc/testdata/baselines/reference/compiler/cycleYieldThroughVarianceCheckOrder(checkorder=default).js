//// [tests/cases/compiler/cycleYieldThroughVarianceCheckOrder.ts] ////

//// [cycleYieldThroughVarianceCheckOrder.ts]
// Resolving the base of E measures the variances of B, which needs the type
// of p, which needs the members of E. Whether p is circular must not depend
// on whether B is checked before the type of arg is queried.

declare class B<T> {
    p: E["p"];
}
declare class E extends mix(Base) {
    p: number;
}
declare function mix<T extends new () => object>(x: T): T;
declare class Base {
    constructor(arg?: InstanceType<typeof B>);
}


//// [cycleYieldThroughVarianceCheckOrder.js]
"use strict";
// Resolving the base of E measures the variances of B, which needs the type
// of p, which needs the members of E. Whether p is circular must not depend
// on whether B is checked before the type of arg is queried.
