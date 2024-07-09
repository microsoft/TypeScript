// enum is only a subtype of number, no types are subtypes of enum, all of these except the first are errors


enum E { A }

interface I0 {
    [x: string]: E;
    foo: E; // identical and subtype, ok
}


declare function foo(x: E): E;
declare function foo(x: number): number;
declare function foo(x: any): any;
var r = foo(E.A); // E
var r2 = foo(1); // number
var r3 = foo(<any>null); // any

declare function foo2(x: string): string;
declare function foo2(x: E): E;

var r4 = foo2(E.A);

declare function foo3(x: boolean): boolean;
declare function foo3(x: E): E;

var r4 = foo3(E.A);

declare function foo4(x: Date): Date;
declare function foo4(x: E): E;

var r4 = foo4(E.A);

declare function foo5(x: RegExp): RegExp;
declare function foo5(x: E): E;

var r4 = foo5(E.A);

declare function foo6(x: { bar: number }): { bar: number };
declare function foo6(x: E): E;

var r4 = foo6(E.A);

declare function foo7(x: number[]): number[];
declare function foo7(x: E): E;

var r4 = foo7(E.A);

interface I8 { foo: string; }
declare function foo8(x: I8): I8;
declare function foo8(x: E): E;

var r4 = foo8(E.A);

class A { foo: number; }
declare function foo9(x: A): A;
declare function foo9(x: E): E;

var r4 = foo9(E.A);

class A2<T> { foo: T; }
declare function foo10(x: A2<number>): A2<number>;
declare function foo10(x: E): E;

var r4 = foo10(E.A);

declare function foo11(x: (x) => number): (x) => number;
declare function foo11(x: E): E;

var r4 = foo11(E.A);

declare function foo12(x: <T>(x: T) => T): <T>(x: T) => T;
declare function foo12(x: E): E;

var r4 = foo12(E.A);

enum E2 { A }
declare function foo13(x: E2): E2;
declare function foo13(x: E): E;

var r4 = foo13(E.A);

function f() { }
module f {
    export var bar = 1;
}
declare function foo14(x: typeof f): typeof f;
declare function foo14(x: E): E;

var r4 = foo14(E.A);

class CC { baz: string }
module CC {
    export var bar = 1;
}
declare function foo15(x: CC): CC;
declare function foo15(x: E): E;

var r4 = foo15(E.A);

declare function foo16(x: Object): Object;
declare function foo16(x: E): E;

var r4 = foo16(E.A);

declare function foo17(x: {}): {};
declare function foo17(x: E): E;

var r4 = foo16(E.A);