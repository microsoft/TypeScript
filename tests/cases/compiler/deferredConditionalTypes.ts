// @strict: true

type T0<X, Y> = X extends Y ? true : false;  // Deferred
type T1<X, Y> = [X] extends [Y] ? true : false;  // Deferred
type T2<X, Y> = [X, X] extends [Y, Y] ? true : false;  // Deferred
type T3<X, Y> = [X, X, X] extends [Y, Y, Y] ? true : false;  // Deferred

type T4<X, Y> = [X] extends [Y, Y] ? true : false;  // false
type T5<X, Y> = [X, X] extends [Y] ? true : false;  // false

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