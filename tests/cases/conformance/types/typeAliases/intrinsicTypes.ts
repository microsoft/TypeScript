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

type TI1 = Integer<3.5>;  // 3
type TI2 = Integer<2.5 | 3.4>;  // 2 | 3
type TI3 = Integer<number>;  // number
type TI4 = Integer<any>;  // any
type TI5 = Integer<never>;  // never
type TI6 = Integer<'42'>;  // Error

type TA1 = Add<4, 2>;  // 6
type TA2L = Add<4 | 5, 2>;  // 6 | 7
type TA2R = Add<4, 2 | 3>;  // 6 | 7
type TA2LR = Add<4 | 5, 2 | 3>;  // 6 | 7 | 8
type TA3L = Add<number, 2>;  // number
type TA3R = Add<4, number>;  // number
type TA3LR = Add<number, number>;  // number
type TA4L = Add<any, 2>;  // any
type TA4R = Add<4, any>;  // any
type TA4LR = Add<any, any>;  // any
type TA5L = Add<never, 2>;  // never
type TA5R = Add<4, never>;  // never
type TA5LR = Add<never, never>;  // never
type TA6L = Add<'4', 2>;  // Error
type TA6R = Add<4, '2'>;  // Error
type TA6LR = Add<'4', '2'>;  // Error

type TS1 = Subtract<4, 2>;  // 2
type TS2L = Subtract<4 | 5, 2>;  // 2 | 3
type TS2R = Subtract<4, 2 | 3>;  // 2 | 1
type TS2LR = Subtract<4 | 5, 2 | 3>;  // 2 | 1 | 3
type TS3L = Subtract<number, 2>;  // number
type TS3R = Subtract<4, number>;  // number
type TS3LR = Subtract<number, number>;  // number
type TS4L = Subtract<any, 2>;  // any
type TS4R = Subtract<4, any>;  // any
type TS4LR = Subtract<any, any>;  // any
type TS5L = Subtract<never, 2>;  // never
type TS5R = Subtract<4, never>;  // never
type TS5LR = Subtract<never, never>;  // never
type TS6L = Subtract<'4', 2>;  // Error
type TS6R = Subtract<4, '2'>;  // Error
type TS6LR = Subtract<'4', '2'>;  // Error

type TM1 = Multiply<4, 2>;  // 8
type TM2L = Multiply<4 | 5, 2>;  // 8 | 10
type TM2R = Multiply<4, 2 | 3>;  // 8 | 12
type TM2LR = Multiply<4 | 5, 2 | 3>;  // 8 | 12 | 10 | 15
type TM3L = Multiply<number, 2>;  // number
type TM3R = Multiply<4, number>;  // number
type TM3LR = Multiply<number, number>;  // number
type TM4L = Multiply<any, 2>;  // any
type TM4R = Multiply<4, any>;  // any
type TM4LR = Multiply<any, any>;  // any
type TM5L = Multiply<never, 2>;  // never
type TM5R = Multiply<4, never>;  // never
type TM5LR = Multiply<never, never>;  // never
type TM6L = Multiply<'4', 2>;  // Error
type TM6R = Multiply<4, '2'>;  // Error
type TM6LR = Multiply<'4', '2'>;  // Error

type TD1 = Divide<4, 2>;  // 2
type TD2L = Divide<4 | 5, 2>;  // 2 | 2.5
type TD2R = Divide<4, 2 | 4>;  // 2 | 1
type TD2LR = Divide<4 | 5, 2 | 4>;  // 2 | 1 | 2.5 | 1.25
type TD3L = Divide<number, 2>;  // number
type TD3R = Divide<4, number>;  // number
type TD3LR = Divide<number, number>;  // number
type TD4L = Divide<any, 2>;  // any
type TD4R = Divide<4, any>;  // any
type TD4LR = Divide<any, any>;  // any
type TD5L = Divide<never, 2>;  // never
type TD5R = Divide<4, never>;  // never
type TD5LR = Divide<never, never>;  // never
type TD6L = Divide<'4', 2>;  // Error
type TD6R = Divide<4, '2'>;  // Error
type TD6LR = Divide<'4', '2'>;  // Error
type TD7 = Divide<1, 0>; // never

type TIX1<S extends number> = Integer<S>;
type TIX2 = TIX1<4.2>;  // 4
type TAX1<M extends number, N extends number> = Add<M, N>;
type TAX2 = TAX1<4, 2>;  // 6
type TSX1<M extends number, N extends number> = Subtract<M, N>;
type TSX2 = TSX1<4, 2>;  // 6
type TMX1<M extends number, N extends number> = Multiply<M, N>;
type TMX2 = TMX1<4, 2>;  // 8
type TDX1<M extends number, N extends number> = Divide<M, N>;
type TDX2 = TDX1<4, 2>;  // 2
type TAMX = Add<2, Multiply<5, 8>>  // 42

function foo5<T extends number, U extends T>(s: number, x: Add<T, U>, y: Multiply<T, U>) {
    s = x;
    s = y;
    x = s;  // Error
    x = y;  // Error
    y = s;  // Error
    y = x;  // Error
}

function foo6<T extends 0 | 1>(x: Add<T, 3>) {
    let s: 3 | 4 = x;
}

declare function foo7<T extends number>(x: Integer<T>): T;

function foo8<U extends number>(x: Integer<U>) {
    return foo7(x);
}
