// interfaces that merge must not have members that conflict

interface A {
    foo(x: number): number;
    foo(x: string): string;
}

interface A {
    foo(x: Date): Date;
}

interface B<T> {
    foo(x: T): number;
    foo(x: string): string;
}

interface B<T> {
    foo(x: T): Date;
    foo(x: Date): string;
}

var b: B<boolean>;
var r = b.foo(true); // returns Date

// add generic overload
interface C<T, U> {
    foo(x: T, y: U): string;
    foo(x: string, y: string): number;
}

interface C<T, U> {
    foo<W>(x: W, y: W): W;
}

var c: C<boolean, Date>;
var r2 = c.foo(1, 2); // number

// add generic overload that would be ambiguous
interface D<T, U> {
    a: T;
    b: U;
    foo<A>(x: A, y: A): U;
}

interface D<T, U> {
    foo<W>(x: W, y: W): T;
}

var d: D<boolean, Date>;
var r3 = d.foo(1, 1); // boolean, last definition wins