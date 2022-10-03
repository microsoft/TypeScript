// @allowJs: true
// @noEmit: true

// @fileName: a.ts
var a: any;
var t: [any, any];
declare function f1<T>(t: T): T
declare function f2<T>(t: T[]): T;
declare function f3<T, U>(t: [T, U]): [T, U];
declare function f4<T>(x: { bar: T; baz: T }): T;
declare function f5<T>(x: (a: T) => void): T;
declare function f6<T>(x: new (a: T) => {}): T;
declare function f7<T>(x: (a: any) => a is T): T;
declare function f8<T>(x: () => T): T;
declare function f9<T>(x: new () => T): T;
declare function f10<T>(x: { [x: string]: T }): T;
declare function f11<T>(x: { [x: number]: T }): T;
declare function f12<T, U>(x: T | U): [T, U];
declare function f13<T, U>(x: T & U): [T, U];
declare function f14<T, U>(x: { a: T | U, b: U & T }): [T, U];
interface I<T> { }
declare function f15<T>(x: I<T>): T;
declare function f16<T>(x: Partial<T>): T;
declare function f17<T, K>(x: {[P in keyof T]: K}): T;
declare function f18<T, K extends keyof T>(x: {[P in K]: T[P]}): T;
declare function f19<T, K extends keyof T>(k: K, x: T[K]): T;

// @fileName: a.js
var a = f1(a);
var a = f2(a);
var t = f3(a);
var a = f4(a);
var a = f5(a);
var a = f6(a);
var a = f7(a);
var a = f8(a);
var a = f9(a);
var a = f10(a);
var a = f11(a);
var t = f12(a);
var t = f13(a);
var t = f14(a);
var a = f15(a);
var a = f16(a);
var a = f17(a);
var a = f18(a);
var a = f19(a, a);