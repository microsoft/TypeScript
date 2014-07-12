class SomeBase {
    private n;

    public s: string;
}
class SomeDerived1 extends SomeBase {
    private m;
}
class SomeDerived2 extends SomeBase {
    private m;
}
class SomeDerived3 extends SomeBase {
    private m;
}


// Ambiguous call picks the first overload in declaration order
function fn1(s: string): string;
function fn1(s: number): number;
function fn1() { return null; }

var s = fn1(undefined);
var s: string;


// No candidate overloads found
fn1({}); // Error

// Generic and non - generic overload where generic overload is the only candidate when called with type arguments
function fn2(s: string, n: number): number;
function fn2<T>(n: number, t: T): T;
function fn2() { return undefined; }

var d = fn2<Date>(0, undefined);
var d: Date;

// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = fn2(0, '');

// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
fn2<Date>('', 0); // Error

// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
fn2('', 0); // OK

// Generic overloads with differing arity called without type arguments
function fn3<T>(n: T): string;
function fn3<T, U>(s: string, t: T, u: U): U;
function fn3<T, U, V>(v: V, u: U, t: T): number;
function fn3() { return null; }

var s = fn3(3);
var s = fn3('', 3, '');
var n = fn3(5, 5, 5);
var n: number;

// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = fn3<number>(4);
var s = fn3<string, string>('', '', '');
var n = fn3<number, string, string>('', '', 3);

// Generic overloads with differing arity called with type argument count that doesn't match any overload
fn3<number, number, number, number>(); // Error

// Generic overloads with constraints called with type arguments that satisfy the constraints
function fn4<T extends string, U extends number>(n: T, m: U);
function fn4<T extends number, U extends string>(n: T, m: U);
function fn4() { }
fn4<string, number>('', 3);
fn4<string, number>(3, ''); // Error
fn4<number, string>('', 3); // Error
fn4<number, string>(3, ''); 

// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
fn4('', 3);
fn4(3, '');
fn4(3, undefined);
fn4('', null);

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
fn4<boolean, Date>(null, null); // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
fn4(true, null); // Error
fn4(null, true); // Error

// Non - generic overloads where contextual typing of function arguments has errors
function fn5(f: (n: string) => void): string;
function fn5(f: (n: number) => void): number;
function fn5() { return undefined; }
var n = fn5((n) => n.toFixed());
var s = fn5((n) => n.substr(0));

