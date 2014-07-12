//@noImplicitAny: true

// No implicit-'any' errors.
function f1(): void { }

// Implicit-'any' error for x.
function f2(x): void { }

// No implicit-'any' errors.
function f3(x: any): void { }

// Implicit-'any' errors for x, y, and z.
function f4(x, y, z): void { }

// Implicit-'any' errors for x, and z.
function f5(x, y: any, z): void { }

// Implicit-'any[]' error for r.
function f6(...r): void { }

// Implicit-'any'/'any[]' errors for x, r.
function f7(x, ...r): void { }

// Implicit-'any' errors for x1, y2, x3, and y3.
function f8(x1, y1: number): any;
function f8(x2: string, y2): any;
function f8(x3, y3): any { } 

// No implicit-'any' errors.
var f9 = () => "";

// Implicit-'any' errors for x.
var f10 = (x) => "";

// Implicit-'any' errors for x, y, and z.
var f11 = (x, y, z) => "";

// Implicit-'any' errors for x and z.
var f12 = (x, y: any, z) => "";

// Implicit-'any[]' error for r.
var f13 = (...r) => "";

// Implicit-'any'/'any[]' errors for x, r.
var f14 = (x, ...r) => "";