// @strict: true
// @target: es2015
// @lib: es2015,dom

// Repro for #61835: Function.prototype.apply accepts an array-like second argument
// per the ECMAScript spec (CreateListFromArrayLike), so CallableFunction.apply must
// accept ArrayLike<T>, not just T[]. These cases work at runtime but previously errored.

// --- Array-likes that should now be accepted ---

declare const u8: Uint8Array;
const s1: string = String.fromCharCode.apply(null, u8); // Ok (Uint8Array is ArrayLike<number>)

const forwardArguments: (...args: unknown[]) => void = function () {
    console.log.apply(null, arguments); // Ok (IArguments is array-like)
};
forwardArguments(1, 2, 3);

declare function variadic(...xs: number[]): void;
declare const arrayLikeNumbers: ArrayLike<number>;
variadic.apply(undefined, arrayLikeNumbers); // Ok

// A plain array/tuple still works via the arity-checked overload.
declare function foo(a: number, b: string): string;
const a00 = foo.apply(undefined, [10, "hello"]); // Ok

// --- Regression guards: strictBindCallApply arity/element checks must be preserved ---

const a01 = foo.apply(undefined, [10]); // Error: too few elements
const a02 = foo.apply(undefined, [10, 20]); // Error: wrong element type
const a03 = foo.apply(undefined, [10, "hello", 30]); // Error: too many elements

// An array-like of the wrong element type must still be rejected.
declare const arrayLikeStrings: ArrayLike<string>;
const bad = String.fromCharCode.apply(null, arrayLikeStrings); // Error: string is not number
