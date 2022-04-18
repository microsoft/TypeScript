//// [instantiationExpressionErrors.ts]
declare let f: { <T>(): T, g<U>(): U };

// Type arguments in member expressions

const a1 = f<number>;  // { (): number; g<U>(): U; }
const a2 = f.g<number>;  // () => number
const a3 = f<number>.g;  // <U>() => U
const a4 = f<number>.g<number>;  // () => number
const a5 = f['g']<number>;  // () => number

// `[` is an expression starter and cannot immediately follow a type argument list

const a6 = f<number>['g'];  // Error
const a7 = (f<number>)['g'];

// An `<` cannot immediately follow a type argument list

const a8 = f<number><number>;  // Relational operator error
const a9 = (f<number>)<number>;  // Error, no applicable signatures

// Type arguments with `?.` token

const b1 = f?.<number>;  // Error, `(` expected
const b2 = f?.<number>();
const b3 = f<number>?.();
const b4 = f<number>?.<number>();  // Error, expected no type arguments

// Parsed as function call, even though this differs from JavaScript

const x1 = f<true>
(true);

// Parsed as relational expression

const x2 = f<true>
true;

// Parsed as instantiation expression

const x3 = f<true>;
true;

// Parsed as instantiation expression

const x4 = f<true>
if (true) {}


//// [instantiationExpressionErrors.js]
"use strict";
var _a, _b;
// Type arguments in member expressions
var a1 = (f); // { (): number; g<U>(): U; }
var a2 = (f.g); // () => number
var a3 = f.g; // <U>() => U
var a4 = (f.g); // () => number
var a5 = (f['g']); // () => number
// `[` is an expression starter and cannot immediately follow a type argument list
var a6 = f < number > ['g']; // Error
var a7 = (f)['g'];
// An `<` cannot immediately follow a type argument list
var a8 = f < number > ; // Relational operator error
var a9 = ((f)); // Error, no applicable signatures
// Type arguments with `?.` token
var b1 = f === null || f === void 0 ? void 0 : f(); // Error, `(` expected
var b2 = f === null || f === void 0 ? void 0 : f();
var b3 = (_a = (f)) === null || _a === void 0 ? void 0 : _a();
var b4 = (_b = (f)) === null || _b === void 0 ? void 0 : _b(); // Error, expected no type arguments
// Parsed as function call, even though this differs from JavaScript
var x1 = f(true);
// Parsed as relational expression
var x2 = f < true >
    true;
// Parsed as instantiation expression
var x3 = (f);
true;
// Parsed as instantiation expression
var x4 = (f);
if (true) { }


//// [instantiationExpressionErrors.d.ts]
declare let f: {
    <T>(): T;
    g<U>(): U;
};
declare const a1: {
    (): number;
    g<U>(): U;
};
declare const a2: () => number;
declare const a3: <U>() => U;
declare const a4: () => number;
declare const a5: () => number;
declare const a6: boolean;
declare const a7: <U>() => U;
declare const a8: boolean;
declare const a9: {
    g<U>(): U;
};
declare const b1: number;
declare const b2: number;
declare const b3: number;
declare const b4: number;
declare const x1: true;
declare const x2: boolean;
declare const x3: {
    (): true;
    g<U>(): U;
};
declare const x4: {
    (): true;
    g<U>(): U;
};
