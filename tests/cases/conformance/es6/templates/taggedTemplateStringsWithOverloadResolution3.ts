
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

