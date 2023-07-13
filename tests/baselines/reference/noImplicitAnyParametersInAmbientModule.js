//// [tests/cases/compiler/noImplicitAnyParametersInAmbientModule.ts] ////

//// [noImplicitAnyParametersInAmbientModule.ts]
declare module D_M {
    // No implicit-'any' errors.
    function dm_f1(): void;

    // No implicit-'any' errors.
    function dm_f2(x): void;

    // No implicit-'any' errors.
    function dm_f3(x: any): void;

    // No implicit-'any' errors.
    function dm_f4(x, y, z): void;

    // No implicit-'any' errors.
    function dm_f5(x, y: any, z): void;

    // No implicit-'any' errors.
    function dm_f6(...r): void;

    // No implicit-'any' errors.
    function dm_f7(x, ...r): void;

    // No implicit-'any' errors.
    function dm_f8(x1, y1: number): any;
    function dm_f8(x2: string, y2): any;
    function dm_f8(x3, y3): any;

    // No implicit-'any' errors.
    var dm_f9: () => string;

    // No implicit-'any' errors.
    var dm_f10: (x) => string;

    // No implicit-'any' errors.
    var dm_f11: (x, y, z) => string;

    // No implicit-'any' errors.
    var dm_f12: (x, y: any, z) => string;

    // No implicit-'any' errors.
    var dm_f13: (...r) => string;

    // No implicit-'any' errors.
    var dm_f14: (x, ...r) => string;
}

//// [noImplicitAnyParametersInAmbientModule.js]
