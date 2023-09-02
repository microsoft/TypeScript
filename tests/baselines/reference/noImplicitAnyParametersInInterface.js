//// [tests/cases/compiler/noImplicitAnyParametersInInterface.ts] ////

//// [noImplicitAnyParametersInInterface.ts]
interface I {
    // Implicit-'any' errors for first two call signatures, x1, x2, z2.
    ();
    (x1);
    (x2, y2: string, z2): any;

    // No implicit-'any' errors.
    f1(): void;

    // Implicit-'any' errors for x.
    f2(x): void;

    // No implicit-'any' errors.
    f3(x: any): void;

    // Implicit-'any' errors for x, y, and z.
    f4(x, y, z): void;

    // Implicit-'any' errors for x, and z.
    f5(x, y: any, z): void;

    // Implicit-'any[]' errors for r.
    f6(...r): void;

    // Implicit-'any'/'any[]' errors for x, r.
    f7(x, ...r): void;

    // Implicit-'any' errors for x1, y2, x3, and y3.
    f8(x1, y1: number): any;
    f8(x2: string, y2): any;
    f8(x3, y3): any;

    // No implicit-'any' errors.
    f9: () => string;

    // Implicit-'any' errors for x.
    f10: (x) => string;

    // Implicit-'any' errors for x, y, and z.
    f11: (x, y, z) => string;

    // Implicit-'any' errors for x and z.
    f12: (x, y: any, z) => string;

    // Implicit-'any[]' error for r.
    f13: (...r) => string;

    // Implicit-'any'/'any[]' errors for x, r.
    f14: (x, ...r) => string;
}

//// [noImplicitAnyParametersInInterface.js]
