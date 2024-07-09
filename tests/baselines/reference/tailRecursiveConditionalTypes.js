//// [tests/cases/compiler/tailRecursiveConditionalTypes.ts] ////

//// [tailRecursiveConditionalTypes.ts]
type Trim<S extends string> =
    S extends ` ${infer T}` ? Trim<T> :
    S extends `${infer T} ` ? Trim<T> :
    S;

type T10 = Trim<'                                                                                                                                                hello '>;
type T11 = Trim<' hello                                                                                                                                                '>;

type GetChars<S> = GetCharsRec<S, never>;
type GetCharsRec<S, Acc> =
    S extends `${infer Char}${infer Rest}` ? GetCharsRec<Rest, Char | Acc> : Acc;

type T20 = GetChars<'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'>;

type Reverse<T> = any[] extends T ? T : ReverseRec<T, []>;
type ReverseRec<T, Acc extends unknown[]> =
    T extends [infer Head, ...infer Tail] ? ReverseRec<Tail, [Head, ...Acc]> : Acc;

type T30 = Reverse<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>;
type T31 = Reverse<string[]>;

type TupleOf<T, N extends number> = number extends N ? T[] : TupleOfRec<T, N, []>;
type TupleOfRec<T, N extends number, Acc extends unknown[]> =
    Acc["length"] extends N ? Acc : TupleOfRec<T, N, [T, ...Acc]>;

type T40 = TupleOf<any, 200>;
type T41 = TupleOf<any, number>;


//// [tailRecursiveConditionalTypes.js]
"use strict";


//// [tailRecursiveConditionalTypes.d.ts]
type Trim<S extends string> = S extends ` ${infer T}` ? Trim<T> : S extends `${infer T} ` ? Trim<T> : S;
type T10 = Trim<'                                                                                                                                                hello '>;
type T11 = Trim<' hello                                                                                                                                                '>;
type GetChars<S> = GetCharsRec<S, never>;
type GetCharsRec<S, Acc> = S extends `${infer Char}${infer Rest}` ? GetCharsRec<Rest, Char | Acc> : Acc;
type T20 = GetChars<'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'>;
type Reverse<T> = any[] extends T ? T : ReverseRec<T, []>;
type ReverseRec<T, Acc extends unknown[]> = T extends [infer Head, ...infer Tail] ? ReverseRec<Tail, [Head, ...Acc]> : Acc;
type T30 = Reverse<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>;
type T31 = Reverse<string[]>;
type TupleOf<T, N extends number> = number extends N ? T[] : TupleOfRec<T, N, []>;
type TupleOfRec<T, N extends number, Acc extends unknown[]> = Acc["length"] extends N ? Acc : TupleOfRec<T, N, [T, ...Acc]>;
type T40 = TupleOf<any, 200>;
type T41 = TupleOf<any, number>;
