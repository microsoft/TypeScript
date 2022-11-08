/// <reference path="fourslash.ts" />

// @strict: true
////type __ = never;
////
////interface CurriedFunction1<T1, R> {
////    (): CurriedFunction1<T1, R>;
////    (t1: T1): R;
////}
////interface CurriedFunction2<T1, T2, R> {
////    (): CurriedFunction2<T1, T2, R>;
////    (t1: T1): CurriedFunction1<T2, R>;
////    (t1: __, t2: T2): CurriedFunction1<T1, R>;
////    (t1: T1, t2: T2): R;
////}
////
////interface CurriedFunction3<T1, T2, T3, R> {
////    (): CurriedFunction3<T1, T2, T3, R>;
////    (t1: T1): CurriedFunction2<T2, T3, R>;
////    (t1: __, t2: T2): CurriedFunction2<T1, T3, R>;
////    (t1: T1, t2: T2): CurriedFunction1<T3, R>;
////    (t1: __, t2: __, t3: T3): CurriedFunction2<T1, T2, R>;
////    (t1: T1, t2: __, t3: T3): CurriedFunction1<T2, R>;
////    (t1: __, t2: T2, t3: T3): CurriedFunction1<T1, R>;
////    (t1: T1, t2: T2, t3: T3): R;
////}
////
////interface CurriedFunction4<T1, T2, T3, T4, R> {
////    (): CurriedFunction4<T1, T2, T3, T4, R>;
////    (t1: T1): CurriedFunction3<T2, T3, T4, R>;
////    (t1: __, t2: T2): CurriedFunction3<T1, T3, T4, R>;
////    (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
////    (t1: __, t2: __, t3: T3): CurriedFunction3<T1, T2, T4, R>;
////    (t1: __, t2: __, t3: T3): CurriedFunction2<T2, T4, R>;
////    (t1: __, t2: T2, t3: T3): CurriedFunction2<T1, T4, R>;
////    (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;
////    (t1: __, t2: __, t3: __, t4: T4): CurriedFunction3<T1, T2, T3, R>;
////    (t1: T1, t2: __, t3: __, t4: T4): CurriedFunction2<T2, T3, R>;
////    (t1: __, t2: T2, t3: __, t4: T4): CurriedFunction2<T1, T3, R>;
////    (t1: __, t2: __, t3: T3, t4: T4): CurriedFunction2<T1, T2, R>;
////    (t1: T1, t2: T2, t3: __, t4: T4): CurriedFunction1<T3, R>;
////    (t1: T1, t2: __, t3: T3, t4: T4): CurriedFunction1<T2, R>;
////    (t1: __, t2: T2, t3: T3, t4: T4): CurriedFunction1<T1, R>;
////    (t1: T1, t2: T2, t3: T3, t4: T4): R;
////}
////
////declare var curry: {
////    <T1, R>(func: (t1: T1) => R, arity?: number): CurriedFunction1<T1, R>;    
////    <T1, T2, R>(func: (t1: T1, t2: T2) => R, arity?: number): CurriedFunction2<T1, T2, R>;
////    <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R, arity?: number): CurriedFunction3<T1, T2, T3, R>;
////    <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R, arity?: number): CurriedFunction4<T1, T2, T3, T4, R>;
////    (func: (...args: any[]) => any, arity?: number): (...args: any[]) => any;
////    placeholder: __;
////};
////
////export type StylingFunction = (
////    keys: (string | false | undefined) | (string | false | undefined)[],
////    ...rest: unknown[]
////) => object;
////
////declare const getStylingByKeys: (
////    mergedStyling: object,
////    keys: (string | false | undefined) | (string | false | undefined)[],
////    ...args: unknown[]
////) => object;
////
////declare var mergedStyling: object;
////
////export const createStyling: CurriedFunction3<
////    (base16Theme: object) => unknown,
////    object | undefined,
////    object | undefined,
////    StylingFunction
////> = curry<
////    (base16Theme: object) => unknown,
////    object | undefined,
////    object | undefined,
////    StylingFunction
////>(
////    (
////        getStylingFromBase16: (base16Theme: object) => unknown,
////        options: object = {},
////        themeOrStyling: object = {},
////        ...args
////    ): StylingFunction => {
////        return curry(getStylingByKeys, 2)(mergedStyling, .../**/args);
////    },
////    3
////);

verify.baselineQuickInfo();