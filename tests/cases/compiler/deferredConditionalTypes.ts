// @strict: true

type A<T> = { x: T } extends { x: 0 } ? 1 : 0;

type T0<T> = A<T> extends 0 ? 1 : 0;  // Deferred
type T1<T> = [A<T>] extends [0] ? 1 : 0;  // Deferred
type T2<T> = [A<T>, A<T>] extends [0, 0] ? 1 : 0;  // Deferred
type T3<T> = [A<T>, A<T>, A<T>] extends [0, 0, 0] ? 1 : 0;  // Deferred

type T4<T> = [A<T>] extends [0, 0] ? 1 : 0;  // 0
type T5<T> = [A<T>, A<T>] extends [0] ? 1 : 0;  // 0

type T6<T> = { y: A<T> } extends { y: 0 } ? 1 : 0;  // 0, but should be deferred

// Repro from #52068

type Or<A extends boolean, B extends boolean> = [A, B] extends [false, false] ? false : true;
type And<A extends boolean, B extends boolean> = [A, B] extends [true, true] ? true : false;
type Not<T extends boolean> = T extends true ? false : true;
type Extends<A, B> = A extends B ? true : false;

type IsNumberLiteral<T> = And<Extends<T, number>, Not<Extends<number, T>>>;

type IsLiteral<T> = Or<false, IsNumberLiteral<T>>;

// Repro from #51145#issuecomment-1276804047

type Values<O extends object> =
  O extends any[] 
    ? O[number]
    : O[keyof O]

type Equals<A, B> = [A, B] extends [B, A] ? true : false;

type FilterByStringValue<O extends object> = {
  [K in keyof O as Equals<O[K], string> extends true ? K : never]: any
}

type FilteredValuesMatchNever<O extends object>
  = Equals<Values<FilterByStringValue<[O]>>, never>

type FilteredRes1 = FilteredValuesMatchNever<[]>

// repro from #46761

type Bit = 0 | 1;

type AndBit<A extends Bit, B extends Bit> = [A, B] extends [1, 1] ? 1 : 0;

type TestBit<A extends Bit, B extends Bit> = AndBit<
  A extends 1 ? 0 : 1,
  B extends 1 ? 0 : 1
>;

type TestBitRes = TestBit<1, 1>; 