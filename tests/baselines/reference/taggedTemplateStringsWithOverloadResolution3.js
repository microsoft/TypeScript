//// [taggedTemplateStringsWithOverloadResolution3.ts]

// Ambiguous call picks the first overload in declaration order
function fn1(strs: TemplateStringsArray, s: string): string;
function fn1(strs: TemplateStringsArray, n: number): number;
function fn1() { return null; }

var s: string = fn1 `${ undefined }`;

// No candidate overloads found
fn1 `${ {} }`; // Error

function fn2(strs: TemplateStringsArray, s: string, n: number): number;
function fn2<T>(strs: TemplateStringsArray, n: number, t: T): T;
function fn2() { return undefined; }

var d1: Date = fn2 `${ 0 }${ undefined }`; // contextually typed
var d2       = fn2 `${ 0 }${ undefined }`; // any

d1.foo(); // error
d2();     // no error (typed as any)

// Generic and non-generic overload where generic overload is the only candidate
fn2 `${ 0 }${ '' }`; // OK

// Generic and non-generic overload where non-generic overload is the only candidate
fn2 `${ '' }${ 0 }`; // OK

// Generic overloads with differing arity
function fn3<T>(strs: TemplateStringsArray, n: T): string;
function fn3<T, U>(strs: TemplateStringsArray, s: string, t: T, u: U): U;
function fn3<T, U, V>(strs: TemplateStringsArray, v: V, u: U, t: T): number;
function fn3() { return null; }

var s = fn3 `${ 3 }`;
var s = fn3 `${'' }${ 3 }${ '' }`;
var n = fn3 `${ 5 }${ 5 }${ 5 }`;
var n: number;

// Generic overloads with differing arity tagging with arguments matching each overload type parameter count
var s = fn3 `${ 4 }`
var s = fn3 `${ '' }${ '' }${ '' }`;
var n = fn3 `${ '' }${ '' }${ 3 }`;

// Generic overloads with differing arity tagging with argument count that doesn't match any overload
fn3 ``; // Error

// Generic overloads with constraints
function fn4<T extends string, U extends number>(strs: TemplateStringsArray, n: T, m: U);
function fn4<T extends number, U extends string>(strs: TemplateStringsArray, n: T, m: U);
function fn4(strs: TemplateStringsArray)
function fn4() { }

// Generic overloads with constraints tagged with types that satisfy the constraints
fn4 `${ '' }${ 3  }`;
fn4 `${ 3  }${ '' }`;
fn4 `${ 3  }${ undefined }`;
fn4 `${ '' }${ null }`;

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
fn4 `${ null }${ null }`; // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
fn4 `${ true }${ null }`;
fn4 `${ null }${ true }`;

// Non - generic overloads where contextual typing of function arguments has errors
function fn5(strs: TemplateStringsArray, f: (n: string) => void): string;
function fn5(strs: TemplateStringsArray, f: (n: number) => void): number;
function fn5() { return undefined; }
fn5 `${ (n) => n.toFixed() }`; // will error; 'n' should have type 'string'.
fn5 `${ (n) => n.substr(0) }`;



//// [taggedTemplateStringsWithOverloadResolution3.js]
function fn1() { return null; }
var s = (_a = ["", ""], _a.raw = ["", ""], fn1(_a, undefined));
// No candidate overloads found
(_a_1 = ["", ""], _a_1.raw = ["", ""], fn1(_a_1, {})); // Error
function fn2() { return undefined; }
var d1 = (_a_2 = ["", "", ""], _a_2.raw = ["", "", ""], fn2(_a_2, 0, undefined)); // contextually typed
var d2 = (_a_3 = ["", "", ""], _a_3.raw = ["", "", ""], fn2(_a_3, 0, undefined)); // any
d1.foo(); // error
d2(); // no error (typed as any)
// Generic and non-generic overload where generic overload is the only candidate
(_a_4 = ["", "", ""], _a_4.raw = ["", "", ""], fn2(_a_4, 0, '')); // OK
// Generic and non-generic overload where non-generic overload is the only candidate
(_a_5 = ["", "", ""], _a_5.raw = ["", "", ""], fn2(_a_5, '', 0)); // OK
function fn3() { return null; }
var s = (_a_6 = ["", ""], _a_6.raw = ["", ""], fn3(_a_6, 3));
var s = (_a_7 = ["", "", "", ""], _a_7.raw = ["", "", "", ""], fn3(_a_7, '', 3, ''));
var n = (_a_8 = ["", "", "", ""], _a_8.raw = ["", "", "", ""], fn3(_a_8, 5, 5, 5));
var n;
// Generic overloads with differing arity tagging with arguments matching each overload type parameter count
var s = (_a_9 = ["", ""], _a_9.raw = ["", ""], fn3(_a_9, 4));
var s = (_a_10 = ["", "", "", ""], _a_10.raw = ["", "", "", ""], fn3(_a_10, '', '', ''));
var n = (_a_11 = ["", "", "", ""], _a_11.raw = ["", "", "", ""], fn3(_a_11, '', '', 3));
// Generic overloads with differing arity tagging with argument count that doesn't match any overload
(_a_12 = [""], _a_12.raw = [""], fn3(_a_12)); // Error
function fn4() { }
// Generic overloads with constraints tagged with types that satisfy the constraints
(_a_13 = ["", "", ""], _a_13.raw = ["", "", ""], fn4(_a_13, '', 3));
(_a_14 = ["", "", ""], _a_14.raw = ["", "", ""], fn4(_a_14, 3, ''));
(_a_15 = ["", "", ""], _a_15.raw = ["", "", ""], fn4(_a_15, 3, undefined));
(_a_16 = ["", "", ""], _a_16.raw = ["", "", ""], fn4(_a_16, '', null));
// Generic overloads with constraints called with type arguments that do not satisfy the constraints
(_a_17 = ["", "", ""], _a_17.raw = ["", "", ""], fn4(_a_17, null, null)); // Error
// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
(_a_18 = ["", "", ""], _a_18.raw = ["", "", ""], fn4(_a_18, true, null));
(_a_19 = ["", "", ""], _a_19.raw = ["", "", ""], fn4(_a_19, null, true));
function fn5() { return undefined; }
(_a_20 = ["", ""], _a_20.raw = ["", ""], fn5(_a_20, function (n) { return n.toFixed(); })); // will error; 'n' should have type 'string'.
(_a_21 = ["", ""], _a_21.raw = ["", ""], fn5(_a_21, function (n) { return n.substr(0); }));
var _a, _a_1, _a_2, _a_3, _a_4, _a_5, _a_6, _a_7, _a_8, _a_9, _a_10, _a_11, _a_12, _a_13, _a_14, _a_15, _a_16, _a_17, _a_18, _a_19, _a_20, _a_21;
