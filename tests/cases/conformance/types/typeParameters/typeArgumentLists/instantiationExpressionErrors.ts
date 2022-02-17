// @strict: true
// @declaration: true

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
