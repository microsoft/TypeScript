// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62717

type Alias1<T extends object, U extends { [K in keyof T]?: any }> = U;
type Alias2<T extends object, U extends Partial<Record<keyof T, any>>> = U;

type AB = { a: string; b: string };
type B = { b: string };

type Test1 = Alias1<AB, B>; // ok
type Test2 = Alias2<AB, B>; // ok

type Test3<T extends AB> = Alias1<T, B>; // ok
type Test4<T extends AB> = Alias2<T, B>; // ok

type WithNumber<T> = { [K in keyof T]: T[K] | number };
type Alias3<T extends object, U extends WithNumber<Record<keyof T, any>>> = U;

type ABC = { a: string; b: string; c: string };

type Test5 = Alias3<AB, ABC>; // ok
type Test6<T extends AB> = Alias3<T, ABC>; // error

type Alias4<T extends object, U extends WithNumber<Partial<Record<keyof T, any>>>> = U;

type Test7 = Alias4<AB, ABC>; // ok
type Test8<T extends AB> = Alias4<T, ABC>; // ok

type Alias5<T extends object, U extends Partial<WithNumber<Record<keyof T, any>>>> = U;

type Test9 = Alias5<AB, ABC>; // ok
type Test10<T extends AB> = Alias5<T, ABC>; // ok

export {};
