//// [tests/cases/compiler/genericDefaults.ts] ////

//// [genericDefaults.ts]
interface A { a: number; }
interface B { b: number; }
interface C { c: number; }
interface D { d: number; }
interface AB { a: number; b: number; }
interface BC { b: number; c: number; }

declare const a: A;
declare const b: B;
declare const c: C;
declare const d: D;
declare const ab: AB;
declare const bc: BC;
declare const x: any;

// function without type parameters
declare function f00(a?: A): A;
// no inference
f00();
f00(a);

// function with a type parameter without a default
declare function f01<T>(a?: T): T;
// inference
f01();
f01(a);
// no inference, fully supplied
f01<A>();
f01<A>(a);

// function with a type paramter with a default
declare function f02<T = A>(a?: T): T;
// inference
f02();
f02(a);
f02(b);
// no inference, fully supplied
f02<A>();
f02<A>(a);
f02<B>();
f02<B>(b);

// function with a type parameter with a default that refers to itself
declare function f03<T = T>(a?: T): T;
// inference
f03();
f03(a);
f03(b);
// no inference, fully supplied
f03<A>();
f03<A>(a);
f03<B>();
f03<B>(b);

// function with a type paramter without a default and a type parameter with a default
declare function f04<T, U = B>(a?: T, b?: U): [T, U];
// inference
f04();
f04(a);
f04(a, b);
f04(a, c);
// no inference, partially supplied
f04<A>();
f04<A>(a);
f04<A>(a, b);
// no inference, fully supplied
f04<A, B>();
f04<A, B>(a);
f04<A, B>(a, b);
f04<A, C>();
f04<A, C>(a);
f04<A, C>(a, c);

// function with a type parameter without a default and a type parameter with a default that refers to an earlier type parameter
declare function f05<T, U = T>(a?: T, b?: U): [T, U];
// inference
f05();
f05(a);
f05(a, a);
f05(a, b);
// no inference, partially supplied
f05<A>();
f05<A>(a);
f05<A>(a, a);
// no inference, fully supplied
f05<A, B>();
f05<A, B>(a);
f05<A, B>(a, b);

// function with a type parameter with a default that refers to an earlier type parameter with a default
declare function f06<T = A, U = T>(a?: T, b?: U): [T, U];
// inference
f06();
f06(a);
f06(a, a);
f06(a, b);
f06(b, a);
f06(b, b);
// no inference, partially supplied
f06<A>();
f06<A>(a);
f06<A>(a, a);
f06<B>();
f06<B>(b);
f06<B>(b, b);
// no inference, fully supplied
f06<A, B>();
f06<A, B>(a);
f06<A, B>(a, b);
f06<B, C>();
f06<B, C>(b);
f06<B, C>(b, c);

// function with a type parameter without a default and a type parameter with a default that refers to an earlier type parameter with a default
declare function f07<T, U = B, V = U>(a?: T, b?: U, c?: V): [T, U, V];
// inference
f07();
f07(a, b);
f07(a, c);
f07(a, b, b);
f07(a, b, c);
f07(a, c, b);
f07(a, c, c);
// no inference, partially supplied
f07<A>();
f07<A>(a);
f07<A>(a, b);
f07<A>(a, b, b);
f07<A, B>();
f07<A, B>(a);
f07<A, B>(a, b);
f07<A, B>(a, b, b);
f07<A, C>();
f07<A, C>(a);
f07<A, C>(a, c);
f07<A, C>(a, c, c);
// no inference, fully supplied
f07<A, B, C>();
f07<A, B, C>(a);
f07<A, B, C>(a, b);
f07<A, B, C>(a, b, c);
f07<A, C, A>();
f07<A, C, A>(a);
f07<A, C, D>(a, c);
f07<A, C, D>(a, c, d);

// function with a type parameter with a default that refers to an earlier type parameter with a constraint
declare function f08<T extends A, U = T>(a?: T, b?: U): [T, U];
// inference
f08();
f08(a);
f08(a, a);
f08(a, b);
// no inference, partially supplied
f08<A>();
f08<A>(a);
f08<A>(a, a);
// no inference, fully supplied
f08<A, B>();
f08<A, B>(a);
f08<A, B>(a, b);

// function with a type parameter with a constraint and a default that refers to an earlier type parameter
declare function f09<T, U extends T = T>(a?: T, b?: U): [T, U];
// inference
f09();
f09(a);
f09(a, a);
f09(a, ab);
// no inference, partially supplied
f09<A>();
f09<A>(a);
f09<A>(a, a);
f09<A>(a, ab);
// no inference, fully supplied
f09<A, AB>();
f09<A, AB>(a);
f09<A, AB>(a, ab);

// function with a type parameter with a constraint and a default that refers to an earlier type parameter with a constraint
declare function f10<T extends A, U extends T = T>(a?: T, b?: U): [T, U];
// inference
f10();
f10(a);
f10(a, a);
f10(a, ab);
// no inference, partially supplied
f10<A>();
f10<A>(a);
f10<A>(a, a);
f10<A>(a, ab);
// no inference, fully supplied
f10<A, A>();
f10<A, A>(a);
f10<A, A>(a, a);
f10<A, A>(a, ab);
f10<A, AB>();
f10<A, AB>(a);
f10<A, AB>(a, ab);

// function with a type parameter with a default that refers to an earier type parameter in a union
declare function f11<T, U = T | B>(a?: T, b?: U): [T, U];
// inference
f11();
f11(a);
f11(a, a);
f11(a, b);
f11(a, c);
// no inference, partially supplied
f11<A>();
f11<A>(a);
f11<A>(a, a);
f11<A>(a, b);
// no inference, fully supplied
f11<A, C>();
f11<A, C>(a);
f11<A, C>(a, c);

// function with a type parameter with a default that refers to an earlier type parameter in an intersection
declare function f12<T, U = T & B>(a?: T, b?: U): [T, U];
// inference
f12();
f12(a);
f12(a, a);
f12(a, b);
f12(a, c);
// no inference, partially supplied
f12<A>();
f12<A>(a);
f12<A>(a, ab);
// no inference, fully supplied
f12<A, C>();
f12<A, C>(a);
f12<A, C>(a, c);

// function with a type parameter with a default that refers to a later type parameter with a default
declare function f13<T = U, U = B>(a?: T, b?: U): [T, U];
// inference
f13();
f13(a);
f13(a, b);
f13(a, c);
// no inference, partially supplied
f13<A>();
f13<A>(a);
f13<A>(a, b);
// no inference, fully supplied
f13<A, C>();
f13<A, C>(a);
f13<A, C>(a, c);
f13<A, C>(a, c);

// function with a type parameter without a default and a type parameter with a default that refers to a later type parameter with a default
declare function f14<T, U = V, V = C>(a?: T, b?: U, c?: V): [T, U, V];
// inference
f14();
f14(a);
f14(a, b);
f14(a, b, c);
f14(a, b, d);
// no inference, partially supplied
f14<A>();
f14<A>(a);
f14<A>(a, b);
f14<A>(a, b, c);
f14<A, B>();
f14<A, B>(a);
f14<A, B>(a, b);
f14<A, B>(a, b, c);
// no inference fully supplied
f14<A, B, D>();
f14<A, B, D>(a);
f14<A, B, D>(a, b);
f14<A, B, D>(a, b, d);

// function with two type parameters with defaults that mutually refer to each other
declare function f15<T = U, U = T>(a?: T, b?: U): [T, U];
// inference
f15();
f15(a);
f15(a, b);
// no inference, partially supplied
f15<A>();
f15<A>(a);
f15<A>(a, a);
// no inference, fully supplied
f15<A, B>();
f15<A, B>(a);
f15<A, B>(a, b);

// function with a type parameter without a default and two type parameters with defaults that mutually refer to each other
declare function f16<T, U = V, V = U>(a?: T, b?: U, c?: V): [T, U, V];
// no inference
f16();
f16(a);
f16(a, b);
f16(a, b, b);
// no inference, partially supplied
f16<A>();
f16<A>(a);
f16<A>(a, b);
f16<A>(a, b, b);
f16<A, B>();
f16<A, B>(a);
f16<A, B>(a, b);
f16<A, B>(a, b, b);
// no inference, fully supplied
f16<A, B, D>();
f16<A, B, D>(a);
f16<A, B, D>(a, b);
f16<A, B, D>(a, b, d);

// function with a type parameter with a default that refers to a later type parameter with a default that refers to an earlier type parameter in a union
declare function f17<T = U, U = T | B>(a?: T, b?: U): [T, U];
// inference
f17();
f17(a);
f17(a, a);
f17(a, b);
f17(a, c);
// no inference, partially supplied
f17<A>();
f17<A>(a);
f17<A>(a, a);
f17<A>(a, b);
// no inference, fully supplied
f17<A, C>();
f17<A, C>(a);
f17<A, C>(a, c);

// function with a type parameter without a default and a type parameter with a default that refers to a later type parameter with a default that refers to an earlier type parameter in a union
declare function f18<T, U = V, V = U | C>(a?: T, b?: U, c?: V): [T, U, V];
// inference
f18();
f18(a);
f18(a, b);
f18(a, b, b);
f18(a, b, c);
// no inference, partially supplied
f18<A>();
f18<A>(a);
f18<A>(a, b);
f18<A>(a, b, b);
f18<A>(a, b, c);
f18<A, B>();
f18<A, B>(a);
f18<A, B>(a, b);
f18<A, B>(a, b, b);
f18<A, B>(a, b, c);
// no inference, fully supplied
f18<A, B, D>();
f18<A, B, D>(a);
f18<A, B, D>(a, b);
f18<A, B, D>(a, b, d);

// function with a type parameter with a default that refers to a later type parameter with a default that refers to an earlier type parameter in an intersection
declare function f19<T = U, U = T & B>(a?: T, b?: U): [T, U];
// inference
f19();
f19(a);
f19(a, a);
f19(a, b);
f19(a, ab);
f19(a, c);
// no inference, partially supplied
f19<A>();
f19<A>(a);
f19<A>(a, ab);
// no inference, fully supplied
f19<A, C>();
f19<A, C>(a);
f19<A, C>(a, c);

// function with a type parameter without a default and a type parameter with a default that refers to a later type parameter with a default that refers to an earlier type parameter in an intersection
declare function f20<T, U = V, V = U & C>(a?: T, b?: U, c?: V): [T, U, V];
// inference
f20();
f20(a);
f20(a, b);
f20(a, b, c);
// no inference, partially supplied
f20<A>();
f20<A>(a);
f20<A>(a, b);
f20<A>(a, b, bc);
f20<A, B>();
f20<A, B>(a);
f20<A, B>(a, b);
f20<A, B>(a, b, bc);
// no inference, fully supplied
f20<A, B, D>();
f20<A, B, D>(a);
f20<A, B, D>(a, b);
f20<A, B, D>(a, b, d);

interface i00<T = number> { a: T; }
const i00c00 = (<i00>x).a;
const i00c01 = (<i00<number>>x).a;

interface i01<T, U = T> { a: [T, U]; }
const i01c00 = (<i01<number>>x).a;
const i01c01 = (<i01<number, string>>x).a;

interface i02<T extends number, U = T> { a: [T, U]; }
const i02c00 = (<i02<number>>x).a;
const i02c01 = (<i02<1>>x).a;
const i02c02 = (<i02<number, number>>x).a;
const i02c03 = (<i02<1, number>>x).a;
const i02c04 = (<i02<number, 1>>x).a;

interface i03<T extends number, U extends T = T> { a: [T, U]; }
const i03c00 = (<i03<number>>x).a;
const i03c01 = (<i03<1>>x).a;
const i03c02 = (<i03<number, number>>x).a;
const i03c03 = (<i03<1, 1>>x).a;
const i03c04 = (<i03<number, 1>>x).a;

interface i04 {}
interface i04<T> {}
interface i04<T = number> {}
interface i04<T = number, U = string> {}

interface i05<T = T> { a: T; }
const i05c00 = (<i05>x).a;
const i05c01 = (<i05<number>>x).a;

interface i06<T = U, U = T> { a: [T, U]; }
const i06c00 = (<i06>x).a;
const i06c01 = (<i06<number>>x).a;
const i06c02 = (<i06<number, string>>x).a;

interface i07 { a: A; }
interface i07<A = number> { b: A; }
const i07c00 = (<i07>x).a;
const i07c01 = (<i07>x).b;
const i07c02 = (<i07<B>>x).a;
const i07c03 = (<i07<B>>x).b;

interface Base01<T> { a: T; }
interface Base01Constructor { new <T = number>(a?: T): Base01<T>; }

declare const Base01: Base01Constructor;
const Base01c00 = new Base01();
const Base01c01 = new Base01(1);
const Base01c02 = new Base01<number>();
const Base01c03 = new Base01<number>(1);

declare class Derived01<T> extends Base01<T> { }
const Derived01c00 = new Derived01();
const Derived01c01 = new Derived01(1);
const Derived01c02 = new Derived01<number>();
const Derived01c03 = new Derived01<number>(1);

declare class Derived02<T = string> extends Base01<T> { }
const Derived02c00 = new Derived02();
const Derived02c01 = new Derived02(1);
const Derived02c02 = new Derived02<number>();
const Derived02c03 = new Derived02<number>(1);

// https://github.com/Microsoft/TypeScript/issues/16211
interface Base02 {}
interface Base02Constructor { new <T = A>(a: T): Base02 & T; }
declare const Base02: Base02Constructor;
declare class Derived03 extends Base02 {}
const Derived03c00 = new Derived03(ab);
const Derived03c01 = Derived03c00.a;
type DerivedProps = keyof Derived03;

type t00<T = number> = { a: T; }
const t00c00 = (<t00>x).a;
const t00c01 = (<t00<number>>x).a;

type t01<T, U = T> = { a: [T, U]; }
const t01c00 = (<t01<number>>x).a;
const t01c01 = (<t01<number, string>>x).a;

type t02<T extends number, U = T> = { a: [T, U]; }
const t02c00 = (<t02<number>>x).a;
const t02c01 = (<t02<1>>x).a;
const t02c02 = (<t02<number, number>>x).a;
const t02c03 = (<t02<1, number>>x).a;
const t02c04 = (<t02<number, 1>>x).a;

type t03<T extends number, U extends T = T> = { a: [T, U]; }
const t03c00 = (<t03<number>>x).a;
const t03c01 = (<t03<1>>x).a;
const t03c02 = (<t03<number, number>>x).a;
const t03c03 = (<t03<1, 1>>x).a;
const t03c04 = (<t03<number, 1>>x).a;

// https://github.com/Microsoft/TypeScript/issues/16221
interface SelfReference<T = SelfReference<string>> {}

//// [genericDefaults.js]
// no inference
f00();
f00(a);
// inference
f01();
f01(a);
// no inference, fully supplied
f01();
f01(a);
// inference
f02();
f02(a);
f02(b);
// no inference, fully supplied
f02();
f02(a);
f02();
f02(b);
// inference
f03();
f03(a);
f03(b);
// no inference, fully supplied
f03();
f03(a);
f03();
f03(b);
// inference
f04();
f04(a);
f04(a, b);
f04(a, c);
// no inference, partially supplied
f04();
f04(a);
f04(a, b);
// no inference, fully supplied
f04();
f04(a);
f04(a, b);
f04();
f04(a);
f04(a, c);
// inference
f05();
f05(a);
f05(a, a);
f05(a, b);
// no inference, partially supplied
f05();
f05(a);
f05(a, a);
// no inference, fully supplied
f05();
f05(a);
f05(a, b);
// inference
f06();
f06(a);
f06(a, a);
f06(a, b);
f06(b, a);
f06(b, b);
// no inference, partially supplied
f06();
f06(a);
f06(a, a);
f06();
f06(b);
f06(b, b);
// no inference, fully supplied
f06();
f06(a);
f06(a, b);
f06();
f06(b);
f06(b, c);
// inference
f07();
f07(a, b);
f07(a, c);
f07(a, b, b);
f07(a, b, c);
f07(a, c, b);
f07(a, c, c);
// no inference, partially supplied
f07();
f07(a);
f07(a, b);
f07(a, b, b);
f07();
f07(a);
f07(a, b);
f07(a, b, b);
f07();
f07(a);
f07(a, c);
f07(a, c, c);
// no inference, fully supplied
f07();
f07(a);
f07(a, b);
f07(a, b, c);
f07();
f07(a);
f07(a, c);
f07(a, c, d);
// inference
f08();
f08(a);
f08(a, a);
f08(a, b);
// no inference, partially supplied
f08();
f08(a);
f08(a, a);
// no inference, fully supplied
f08();
f08(a);
f08(a, b);
// inference
f09();
f09(a);
f09(a, a);
f09(a, ab);
// no inference, partially supplied
f09();
f09(a);
f09(a, a);
f09(a, ab);
// no inference, fully supplied
f09();
f09(a);
f09(a, ab);
// inference
f10();
f10(a);
f10(a, a);
f10(a, ab);
// no inference, partially supplied
f10();
f10(a);
f10(a, a);
f10(a, ab);
// no inference, fully supplied
f10();
f10(a);
f10(a, a);
f10(a, ab);
f10();
f10(a);
f10(a, ab);
// inference
f11();
f11(a);
f11(a, a);
f11(a, b);
f11(a, c);
// no inference, partially supplied
f11();
f11(a);
f11(a, a);
f11(a, b);
// no inference, fully supplied
f11();
f11(a);
f11(a, c);
// inference
f12();
f12(a);
f12(a, a);
f12(a, b);
f12(a, c);
// no inference, partially supplied
f12();
f12(a);
f12(a, ab);
// no inference, fully supplied
f12();
f12(a);
f12(a, c);
// inference
f13();
f13(a);
f13(a, b);
f13(a, c);
// no inference, partially supplied
f13();
f13(a);
f13(a, b);
// no inference, fully supplied
f13();
f13(a);
f13(a, c);
f13(a, c);
// inference
f14();
f14(a);
f14(a, b);
f14(a, b, c);
f14(a, b, d);
// no inference, partially supplied
f14();
f14(a);
f14(a, b);
f14(a, b, c);
f14();
f14(a);
f14(a, b);
f14(a, b, c);
// no inference fully supplied
f14();
f14(a);
f14(a, b);
f14(a, b, d);
// inference
f15();
f15(a);
f15(a, b);
// no inference, partially supplied
f15();
f15(a);
f15(a, a);
// no inference, fully supplied
f15();
f15(a);
f15(a, b);
// no inference
f16();
f16(a);
f16(a, b);
f16(a, b, b);
// no inference, partially supplied
f16();
f16(a);
f16(a, b);
f16(a, b, b);
f16();
f16(a);
f16(a, b);
f16(a, b, b);
// no inference, fully supplied
f16();
f16(a);
f16(a, b);
f16(a, b, d);
// inference
f17();
f17(a);
f17(a, a);
f17(a, b);
f17(a, c);
// no inference, partially supplied
f17();
f17(a);
f17(a, a);
f17(a, b);
// no inference, fully supplied
f17();
f17(a);
f17(a, c);
// inference
f18();
f18(a);
f18(a, b);
f18(a, b, b);
f18(a, b, c);
// no inference, partially supplied
f18();
f18(a);
f18(a, b);
f18(a, b, b);
f18(a, b, c);
f18();
f18(a);
f18(a, b);
f18(a, b, b);
f18(a, b, c);
// no inference, fully supplied
f18();
f18(a);
f18(a, b);
f18(a, b, d);
// inference
f19();
f19(a);
f19(a, a);
f19(a, b);
f19(a, ab);
f19(a, c);
// no inference, partially supplied
f19();
f19(a);
f19(a, ab);
// no inference, fully supplied
f19();
f19(a);
f19(a, c);
// inference
f20();
f20(a);
f20(a, b);
f20(a, b, c);
// no inference, partially supplied
f20();
f20(a);
f20(a, b);
f20(a, b, bc);
f20();
f20(a);
f20(a, b);
f20(a, b, bc);
// no inference, fully supplied
f20();
f20(a);
f20(a, b);
f20(a, b, d);
var i00c00 = x.a;
var i00c01 = x.a;
var i01c00 = x.a;
var i01c01 = x.a;
var i02c00 = x.a;
var i02c01 = x.a;
var i02c02 = x.a;
var i02c03 = x.a;
var i02c04 = x.a;
var i03c00 = x.a;
var i03c01 = x.a;
var i03c02 = x.a;
var i03c03 = x.a;
var i03c04 = x.a;
var i05c00 = x.a;
var i05c01 = x.a;
var i06c00 = x.a;
var i06c01 = x.a;
var i06c02 = x.a;
var i07c00 = x.a;
var i07c01 = x.b;
var i07c02 = x.a;
var i07c03 = x.b;
var Base01c00 = new Base01();
var Base01c01 = new Base01(1);
var Base01c02 = new Base01();
var Base01c03 = new Base01(1);
var Derived01c00 = new Derived01();
var Derived01c01 = new Derived01(1);
var Derived01c02 = new Derived01();
var Derived01c03 = new Derived01(1);
var Derived02c00 = new Derived02();
var Derived02c01 = new Derived02(1);
var Derived02c02 = new Derived02();
var Derived02c03 = new Derived02(1);
var Derived03c00 = new Derived03(ab);
var Derived03c01 = Derived03c00.a;
var t00c00 = x.a;
var t00c01 = x.a;
var t01c00 = x.a;
var t01c01 = x.a;
var t02c00 = x.a;
var t02c01 = x.a;
var t02c02 = x.a;
var t02c03 = x.a;
var t02c04 = x.a;
var t03c00 = x.a;
var t03c01 = x.a;
var t03c02 = x.a;
var t03c03 = x.a;
var t03c04 = x.a;


//// [genericDefaults.d.ts]
interface A {
    a: number;
}
interface B {
    b: number;
}
interface C {
    c: number;
}
interface D {
    d: number;
}
interface AB {
    a: number;
    b: number;
}
interface BC {
    b: number;
    c: number;
}
declare const a: A;
declare const b: B;
declare const c: C;
declare const d: D;
declare const ab: AB;
declare const bc: BC;
declare const x: any;
declare function f00(a?: A): A;
declare function f01<T>(a?: T): T;
declare function f02<T = A>(a?: T): T;
declare function f03<T = T>(a?: T): T;
declare function f04<T, U = B>(a?: T, b?: U): [T, U];
declare function f05<T, U = T>(a?: T, b?: U): [T, U];
declare function f06<T = A, U = T>(a?: T, b?: U): [T, U];
declare function f07<T, U = B, V = U>(a?: T, b?: U, c?: V): [T, U, V];
declare function f08<T extends A, U = T>(a?: T, b?: U): [T, U];
declare function f09<T, U extends T = T>(a?: T, b?: U): [T, U];
declare function f10<T extends A, U extends T = T>(a?: T, b?: U): [T, U];
declare function f11<T, U = T | B>(a?: T, b?: U): [T, U];
declare function f12<T, U = T & B>(a?: T, b?: U): [T, U];
declare function f13<T = U, U = B>(a?: T, b?: U): [T, U];
declare function f14<T, U = V, V = C>(a?: T, b?: U, c?: V): [T, U, V];
declare function f15<T = U, U = T>(a?: T, b?: U): [T, U];
declare function f16<T, U = V, V = U>(a?: T, b?: U, c?: V): [T, U, V];
declare function f17<T = U, U = T | B>(a?: T, b?: U): [T, U];
declare function f18<T, U = V, V = U | C>(a?: T, b?: U, c?: V): [T, U, V];
declare function f19<T = U, U = T & B>(a?: T, b?: U): [T, U];
declare function f20<T, U = V, V = U & C>(a?: T, b?: U, c?: V): [T, U, V];
interface i00<T = number> {
    a: T;
}
declare const i00c00: number;
declare const i00c01: number;
interface i01<T, U = T> {
    a: [T, U];
}
declare const i01c00: [number, number];
declare const i01c01: [number, string];
interface i02<T extends number, U = T> {
    a: [T, U];
}
declare const i02c00: [number, number];
declare const i02c01: [1, 1];
declare const i02c02: [number, number];
declare const i02c03: [1, number];
declare const i02c04: [number, 1];
interface i03<T extends number, U extends T = T> {
    a: [T, U];
}
declare const i03c00: [number, number];
declare const i03c01: [1, 1];
declare const i03c02: [number, number];
declare const i03c03: [1, 1];
declare const i03c04: [number, 1];
interface i04 {
}
interface i04<T> {
}
interface i04<T = number> {
}
interface i04<T = number, U = string> {
}
interface i05<T = T> {
    a: T;
}
declare const i05c00: any;
declare const i05c01: number;
interface i06<T = U, U = T> {
    a: [T, U];
}
declare const i06c00: [any, any];
declare const i06c01: [number, number];
declare const i06c02: [number, string];
interface i07 {
    a: A;
}
interface i07<A = number> {
    b: A;
}
declare const i07c00: A;
declare const i07c01: number;
declare const i07c02: A;
declare const i07c03: B;
interface Base01<T> {
    a: T;
}
interface Base01Constructor {
    new <T = number>(a?: T): Base01<T>;
}
declare const Base01: Base01Constructor;
declare const Base01c00: Base01<number>;
declare const Base01c01: Base01<number>;
declare const Base01c02: Base01<number>;
declare const Base01c03: Base01<number>;
declare class Derived01<T> extends Base01<T> {
}
declare const Derived01c00: Derived01<unknown>;
declare const Derived01c01: Derived01<number>;
declare const Derived01c02: Derived01<number>;
declare const Derived01c03: Derived01<number>;
declare class Derived02<T = string> extends Base01<T> {
}
declare const Derived02c00: Derived02<string>;
declare const Derived02c01: Derived02<number>;
declare const Derived02c02: Derived02<number>;
declare const Derived02c03: Derived02<number>;
interface Base02 {
}
interface Base02Constructor {
    new <T = A>(a: T): Base02 & T;
}
declare const Base02: Base02Constructor;
declare class Derived03 extends Base02 {
}
declare const Derived03c00: Derived03;
declare const Derived03c01: number;
type DerivedProps = keyof Derived03;
type t00<T = number> = {
    a: T;
};
declare const t00c00: number;
declare const t00c01: number;
type t01<T, U = T> = {
    a: [T, U];
};
declare const t01c00: [number, number];
declare const t01c01: [number, string];
type t02<T extends number, U = T> = {
    a: [T, U];
};
declare const t02c00: [number, number];
declare const t02c01: [1, 1];
declare const t02c02: [number, number];
declare const t02c03: [1, number];
declare const t02c04: [number, 1];
type t03<T extends number, U extends T = T> = {
    a: [T, U];
};
declare const t03c00: [number, number];
declare const t03c01: [1, 1];
declare const t03c02: [number, number];
declare const t03c03: [1, 1];
declare const t03c04: [number, 1];
interface SelfReference<T = SelfReference<string>> {
}
