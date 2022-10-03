//// [noImplicitAnyParametersInAmbientFunctions.ts]
// No implicit-'any' errors.
declare function d_f1(): void;

// Implicit-'any' errors for x.
declare function d_f2(x): void;

// No implicit-'any' errors.
declare function d_f3(x: any): void;

// Implicit-'any' errors for x, y, and z.
declare function d_f4(x, y, z): void;

// Implicit-'any' errors for x, and z.
declare function d_f5(x, y: any, z): void;

// Implicit-'any[]' errors for r.
declare function d_f6(...r): void;

// Implicit-'any'/'any[]' errors for x, r.
declare function d_f7(x, ...r): void;

// Implicit-'any' errors for x1, y2, x3, and y3.
declare function d_f8(x1, y1: number): any;
declare function d_f8(x2: string, y2): any;
declare function d_f8(x3, y3): any;

// No implicit-'any' errors.
declare var d_f9: () => string;

// Implicit-'any' error for x.
declare var d_f10: (x) => string;

// Implicit-'any' errors for x, y, and z.
declare var d_f11: (x, y, z) => string;

// Implicit-'any' errors for x and z.
declare var d_f12: (x, y: any, z) => string;

// Implicit-'any[]' error for r.
declare var d_f13: (...r) => string;

// Implicit-'any'/'any[]' errors for x, r.
declare var d_f14: (x, ...r) => string;

//// [noImplicitAnyParametersInAmbientFunctions.js]
