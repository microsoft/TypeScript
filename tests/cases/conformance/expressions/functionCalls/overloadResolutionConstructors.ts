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

interface fn1 {
    new (s: string): string;
    new (s: number): number;
}
var fn1: fn1;

// Ambiguous call picks the first overload in declaration order
var s = new fn1(undefined);
var s: string;

// No candidate overloads found
new fn1({}); // Error

// Generic and non - generic overload where generic overload is the only candidate when called with type arguments
interface fn2 {
    new (s: string, n: number): number;
    new <T>(n: number, t: T): T;
}
var fn2: fn2;

var d = new fn2<Date>(0, undefined);
var d: Date;

// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = new fn2(0, '');

// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
new fn2<Date>('', 0); // Error

// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
new fn2('', 0); // OK

// Generic overloads with differing arity called without type arguments
interface fn3 {
    new<T>(n: T): string;
    new<T, U>(s: string, t: T, u: U): U;
    new<T, U, V>(v: V, u: U, t: T): number;
}
var fn3: fn3;

var s = new fn3(3);
var s = new fn3('', 3, '');
var n = new fn3(5, 5, 5);
var n: number;

// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = new fn3<number>(4);
var s = new fn3<string, string>('', '', '');
var n = new fn3<number, string, string>('', '', 3);

// Generic overloads with differing arity called with type argument count that doesn't match any overload
new fn3<number, number, number, number>(); // Error

// Generic overloads with constraints called with type arguments that satisfy the constraints
interface fn4 {
    new<T extends string, U extends number>(n: T, m: U);
    new<T extends number, U extends string>(n: T, m: U);
}
var fn4: fn4;

new fn4<string, number>('', 3);
new fn4<string, number>(3, ''); // Error
new fn4<number, string>('', 3); // Error
new fn4<number, string>(3, ''); 

// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
new fn4('', 3);
new fn4(3, '');
new fn4(3, undefined);
new fn4('', null);

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
new fn4<boolean, Date>(null, null); // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
new fn4(true, null); // Error
new fn4(null, true); // Error

// Non - generic overloads where contextual typing of function arguments has errors
interface fn5 {
    new(f: (n: string) => void): string;
    new(f: (n: number) => void): number;
}
var fn5: fn5;
var n = new fn5((n) => n.toFixed());
var s = new fn5((n) => n.substr(0));
