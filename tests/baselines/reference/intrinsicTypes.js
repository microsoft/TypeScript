//// [intrinsicTypes.ts]
type TU1 = Uppercase<'hello'>;  // "HELLO"
type TU2 = Uppercase<'foo' | 'bar'>;  // "FOO" | "BAR"
type TU3 = Uppercase<string>;  // string
type TU4 = Uppercase<any>;  // any
type TU5 = Uppercase<never>;  // never
type TU6 = Uppercase<42>;  // Error

type TL1 = Lowercase<'HELLO'>;  // "hello"
type TL2 = Lowercase<'FOO' | 'BAR'>;  // "foo" | "bar"
type TL3 = Lowercase<string>;  // string
type TL4 = Lowercase<any>;  // any
type TL5 = Lowercase<never>;  // never
type TL6 = Lowercase<42>;  // Error

type TC1 = Capitalize<'hello'>;  // "Hello"
type TC2 = Capitalize<'foo' | 'bar'>;  // "Foo" | "Bar"
type TC3 = Capitalize<string>;  // string
type TC4 = Capitalize<any>;  // any
type TC5 = Capitalize<never>;  // never
type TC6 = Capitalize<42>;  // Error

type TN1 = Uncapitalize<'Hello'>;  // "hello"
type TN2 = Uncapitalize<'Foo' | 'Bar'>;  // "foo" | "bar"
type TN3 = Uncapitalize<string>;  // string
type TN4 = Uncapitalize<any>;  // any
type TN5 = Uncapitalize<never>;  // never
type TN6 = Uncapitalize<42>;  // Error

type TX1<S extends string> = Uppercase<`aB${S}`>;
type TX2 = TX1<'xYz'>;  // "ABXYZ"
type TX3<S extends string> = Lowercase<`aB${S}`>;
type TX4 = TX3<'xYz'>;  // "abxyz"
type TX5 = `${Uppercase<'abc'>}${Lowercase<'XYZ'>}`;  // "ABCxyz"

type MyUppercase<S extends string> = intrinsic;  // Error

function foo1<T extends string, U extends T>(s: string, x: Uppercase<T>, y: Uppercase<U>) {
    s = x;
    s = y;
    x = s;  // Error
    x = y;
    y = s;  // Error
    y = x;  // Error
}

function foo2<T extends 'foo' | 'bar'>(x: Uppercase<T>) {
    let s: 'FOO' | 'BAR' = x;
}

declare function foo3<T extends string>(x: Uppercase<T>): T;

function foo4<U extends string>(x: Uppercase<U>) {
    return foo3(x);
}


//// [intrinsicTypes.js]
"use strict";
function foo1(s, x, y) {
    s = x;
    s = y;
    x = s; // Error
    x = y;
    y = s; // Error
    y = x; // Error
}
function foo2(x) {
    var s = x;
}
function foo4(x) {
    return foo3(x);
}


//// [intrinsicTypes.d.ts]
declare type TU1 = Uppercase<'hello'>;
declare type TU2 = Uppercase<'foo' | 'bar'>;
declare type TU3 = Uppercase<string>;
declare type TU4 = Uppercase<any>;
declare type TU5 = Uppercase<never>;
declare type TU6 = Uppercase<42>;
declare type TL1 = Lowercase<'HELLO'>;
declare type TL2 = Lowercase<'FOO' | 'BAR'>;
declare type TL3 = Lowercase<string>;
declare type TL4 = Lowercase<any>;
declare type TL5 = Lowercase<never>;
declare type TL6 = Lowercase<42>;
declare type TC1 = Capitalize<'hello'>;
declare type TC2 = Capitalize<'foo' | 'bar'>;
declare type TC3 = Capitalize<string>;
declare type TC4 = Capitalize<any>;
declare type TC5 = Capitalize<never>;
declare type TC6 = Capitalize<42>;
declare type TN1 = Uncapitalize<'Hello'>;
declare type TN2 = Uncapitalize<'Foo' | 'Bar'>;
declare type TN3 = Uncapitalize<string>;
declare type TN4 = Uncapitalize<any>;
declare type TN5 = Uncapitalize<never>;
declare type TN6 = Uncapitalize<42>;
declare type TX1<S extends string> = Uppercase<`aB${S}`>;
declare type TX2 = TX1<'xYz'>;
declare type TX3<S extends string> = Lowercase<`aB${S}`>;
declare type TX4 = TX3<'xYz'>;
declare type TX5 = `${Uppercase<'abc'>}${Lowercase<'XYZ'>}`;
declare type MyUppercase<S extends string> = intrinsic;
declare function foo1<T extends string, U extends T>(s: string, x: Uppercase<T>, y: Uppercase<U>): void;
declare function foo2<T extends 'foo' | 'bar'>(x: Uppercase<T>): void;
declare function foo3<T extends string>(x: Uppercase<T>): T;
declare function foo4<U extends string>(x: Uppercase<U>): U;
