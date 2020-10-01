// @strict: true
// @declaration: true

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
