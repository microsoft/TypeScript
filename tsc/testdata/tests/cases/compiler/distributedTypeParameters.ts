// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63708

type Show<A, B extends A> = [A, B] & {};

type Issue1<A, B extends A> =
  A extends unknown ?
    B extends unknown ?
        Show<A, B> :  // Error
        never :
    never;

type Issue2<A, B extends A> =
  B extends unknown ?
    A extends unknown ?
        Show<A, B> :  // Error
        never :
    never;

type Issue3<A, B> =
  A extends B ?
    B extends A ?
        Show<A, B> :
        never :
    never;

type Issue4<A, B> =
  B extends A ?
    A extends B ?
        Show<A, B> :  // Error
        never :
    never;

type X1 = Issue1<0 | 1, 0 | 1>;
type X2 = Issue2<0 | 1, 0 | 1>;
type X3 = Issue3<0 | 1, 0 | 1>;
type X4 = Issue4<0 | 1, 0 | 1>;

type T1<A extends number, B extends A> =
  A extends B ?
    never :
    Show<A, B>;  // Error

type T2<A extends number, B extends A> =
  A extends B ?
    Show<A, B> :  // Error
    never;

type T3<A, B extends A, C extends B> =
  A extends unknown ?
    Show<A, C> :  // Error
    Show<B, C>;

type T4<A, B extends A, C extends B> =
  A extends unknown ?
    B extends unknown ?
      Show<A, C> :  // Error
      Show<B, C> :  // Error
    never;

type T5<A extends number, B extends A> =
  [A] extends [B] ?
    Show<A, B> :
    never;

type M1<A, B extends A> = {
  [K in keyof A]: Show<A, B>;  // Error
};

type M2<A, B extends A> = {
  [K in keyof A as K]: Show<A, B>;  // Error
};

type M3<A, B extends A> = {
  [K in keyof A & string]: Show<A, B>;
};

type X5 = M1<{ a: 0 } | { b: 1 }, { a: 0 }>;
type X6 = M2<{ a: 0 } | { b: 1 }, { a: 0 }>;

type ShowResult<T, U extends T> = U extends T ? true : false;

declare function conditionalIndexedAccess<T, U extends T>(y: U):
  T extends unknown ? ShowResult<T[keyof T], U[keyof T]> : never;  // Error

const conditionalIndexedAccessResult = conditionalIndexedAccess<
  { a: 1 } | { b: 2 },
  { a: 1 }
>({ a: 1 });

declare function mappedIndexedAccess<T, U extends T>(y: U): {
  [P in keyof T]: ShowResult<T[P], U[P]>;  // Error
};

const mappedIndexedAccessResult = mappedIndexedAccess<
  { a: 1 } | { b: 2 },
  { a: 1 }
>({ a: 1 });

// Ensure mapped type modifiers are computed correctly, example from type-fest

type IsReadonlyKeyOf<Type extends object, Key extends keyof Type> =
	IsAny<Type | Key> extends true ? never
		: Key extends unknown // For distributing `Key`
			? Type extends unknown // For distributing `Type`
				? IsEqual<
					{[K in Key]: Type[Key]},
					{readonly [K in Key]: Type[Key]}
				>
				: never // Should never happen
			: never; // Should never happen

type IsAny<T> = 0 extends 1 & NoInfer<T> ? true : false;

type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? _IsEqual<A, B>
			: false
		: false;

type _IsEqual<A, B> =
	(<G>() => G extends A & G | G ? 1 : 2) extends
	(<G>() => G extends B & G | G ? 1 : 2)
		? true
		: false;

type T10 = IsReadonlyKeyOf<{ a: string }, 'a'>;  // false
type T11 = IsReadonlyKeyOf<{ readonly b: string }, 'b'>;  // true

// Repro from triggerdotdev/trigger.dev

type Exact<P, I extends P> =
  P extends unknown ?
    { [K in keyof P]: Exact<P[K], I[K]> } :  // Error
    never;

type X7 = Exact<{ a: 0 } | { b: 1 }, { a: 0 }>;
