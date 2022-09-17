// @strict: true
// @noEmit: true

// #50791

declare function fn1({}?: { x: string }): void; // ok
declare function fn2({ x }?: { x: string }): void; // ok
declare function fn3([]?: [ x: string ]): void; // ok
declare function fn4([ x ]?: [ x: string ]): void; // ok
