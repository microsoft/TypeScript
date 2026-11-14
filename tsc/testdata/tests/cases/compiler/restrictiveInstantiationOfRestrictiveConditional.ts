// @strict: true
// @exactOptionalPropertyTypes: true
// @module: nodenext
// @target: esnext
// @noEmit: true
// @skipLibCheck: true

// @filename: arraySlice.d.ts
export type {ArraySlice};
declare const tag: unique symbol;
type IsNever<T> = [T] extends [never] ? true : false;
type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? _IsEqual<A, B>
			: false
		: false;
type _IsEqual<A, B> = never;
type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;
type UnknownArray = any;
type IfNotAnyOrNever<T, Cases extends {ifNot: unknown; ifAny?: unknown; ifNever?: unknown}> =
	IsNever<T> extends true
			? 'ifNever' extends keyof Cases
				? Cases['ifNever']
				: never
			: Cases['ifNot'];
type And<A extends boolean, B extends boolean> = B;
type Not<A extends boolean> = any;
type MaxLength<Array_ extends UnknownArray> = never;
type HasNoStaticElements<Array_ extends UnknownArray> = unknown;
type CollapseLiterals<Union> = Union extends Primitive
	? Union extends infer Collapsed & {}
		? Collapsed
		: Union
	: Union;
type PositiveNumericStringGt<A extends string, B extends string> = A;
type Absolute<N extends number | bigint> = _Absolute<N extends object ? UnwrapBrand<N> : N>;
type _Absolute<N extends number | bigint> = N extends bigint
	? `${N}` extends `-${infer Magnitude extends bigint}`
		? Magnitude
		: N
	: `${N}` extends `-${infer Magnitude extends number}`
		? Magnitude
		: `${N}` extends '-Infinity'
			? PositiveInfinity
			: `${number}` extends `${N}` ? number : N;
type GreaterThan<A extends _Numeric, B extends _Numeric> =
	_GreaterThan<A extends object ? UnwrapBrand<A> : A, B extends object ? UnwrapBrand<B> : B>;
type _GreaterThan<A extends _Numeric, B extends _Numeric> =
	A extends _Numeric
		? B extends _Numeric
			? `${number}` extends `${A | B}`
				? boolean
				: bigint extends A | B
					? boolean
					: A extends PositiveInfinity
							? B extends PositiveInfinity ? false : true
							: B extends NegativeInfinity
								? A extends NegativeInfinity ? false : true
								: A extends NegativeInfinity
									? false
									: B extends PositiveInfinity
										? false
										: [IsNegative<A>, IsNegative<B>] extends infer Signs extends [boolean, boolean]
											? [true, false] extends Signs
												? false
												: [false, true] extends Signs
													? true
													: [false, false] extends Signs
														? PositiveNumericStringGt<`${A}`, `${B}`>
														: PositiveNumericStringGt<`${Absolute<B>}`, `${Absolute<A>}`>
											: never
			: never
		: never;
type IsReadonlyArray<Array_ extends UnknownArray> = never;
type UnionMember<T> =
	IsNever<T> extends true
		? never
		: (T extends any ? () => T : never) extends () => (infer R)
			? R
			: never;
type TagContainer<Token> = {
	readonly [tag]: Token;
};
type Tag<TagName extends PropertyKey, TagMetadata> = unknown;
type RemoveAllTags<T> = T extends TagContainer<any>
	? RemoveAllTags<UnionMember<RemoveTag<T>>>
	: T;
type RemoveTag<T extends TagContainer<unknown>> =
	| {
		[ThisTag in keyof T[typeof tag]]: T extends infer Underlying & Tag<ThisTag, T[typeof tag][ThisTag]>
			? [Underlying] extends [T] ? never : Underlying
			: never
	}[keyof T[typeof tag]]
	| (T extends infer Underlying & TagContainer<T[typeof tag]>
		? [Underlying] extends [T] ? never : Underlying
		: never);
type UnwrapBrand<T> = IfNotAnyOrNever<T, {ifNot: _UnwrapBrand<T, Primitive>}>;
type _UnwrapBrand<T, Base> = T extends Primitive
	? CollapseLiterals<T extends TagContainer<unknown> ? RemoveAllTags<T> : T>
	: T;
type _Numeric = number | bigint;
type PositiveInfinity = unknown;
type NegativeInfinity = never;
type IsNegative<T extends _Numeric> = never;
type Sum<A extends number, B extends number> = any;
type LessThanOrEqual<A extends _Numeric, B extends _Numeric> = unknown;
type ArraySlice<
	Array_ extends readonly unknown[],
	Start extends number = never,
	End extends number = never,
> = ArraySliceImplementation<Array_, Start extends object ? UnwrapBrand<Start> : Start, End>;
type ArraySliceImplementation<
	Array_ extends readonly unknown[],
	Start extends number,
	End extends number,
> = Array_ extends unknown ? _ArraySlice<Array_, Start, End> : never;
type _ArraySlice<
	Array_ extends readonly unknown[],
	Start extends number = 0,
	End extends number = Array_['length'],
> = And<IsEqual<Start, never>, IsEqual<End, never>> extends true
	? Array_
	: number extends Array_['length']
		? VariableLengthArraySliceHelper<Array_, IsNever<Start> extends true ? 0 : Start, End extends PositiveInfinity ? never : End>
		: `${number}` extends `${Start | End}`
			? UnknownLengthArraySlice<Array_>
			: ArraySliceResult<Array_, ArraySliceHelper<Array_, IsEqual<Start, never> extends true ? 0 : Start, IsEqual<End, never> extends true ? MaxLength<Array_> : End>>;
type ArraySliceResult<Array_ extends readonly unknown[], Sliced> =
	IsReadonlyArray<Array_> extends true ? Readonly<Sliced> : Sliced;
type VariableLengthArraySliceHelper<
	Array_ extends readonly unknown[],
	Start extends number,
	End extends number,
> = And<
	And<Not<IsNegative<Start>>, Not<IsNegative<End>>>,
	IsEqual<LessThanOrEqual<End, Start>, true>
> extends true
	? []
	: And<
			And<Not<IsNegative<Start>>, Not<IsNegative<End>>>,
			IsEqual<GreaterThan<End, Start>, true>
		> extends true
			? HasNoStaticElements<Array_> extends true
				? UnknownLengthArraySlice<Array_>
				: ArraySliceResult<Array_, ArraySliceByPositiveIndex<Array_, Start, End>>
			: UnknownLengthArraySlice<Array_>;
type UnknownLengthArraySlice<Array_ extends readonly unknown[]> = any;
type ArraySliceHelper<
	Array_ extends readonly unknown[],
	Start extends number = 0,
	End extends number = MaxLength<Array_>,
	ArrayLength extends number = MaxLength<Array_>,
> = never;
type ArraySliceByPositiveIndex<
	Array_ extends readonly unknown[],
	Start extends number,
	End extends number,
	Result extends Array<Array_[number]> = [],
> = Start extends End
	? Result
	: ArraySliceByPositiveIndex<Array_, Sum<Start, 1>, End, [...Result, Array_[Start]]>;

// @filename: main.ts
// Reduced from type-fest's ArraySlice. Inferring Value from the argument
// measures the variances of ArraySlice, which takes the restrictive
// instantiations of conditional types whose type parameters are already
// restrictive, many times over through the brand-unwrapping types. Such an
// instantiation must be the conditional type itself: making and evaluating
// a separate copy roughly triples the work, enough to exceed the
// instantiation count limit (TS2589) here. Smaller cases do not get near
// the limit either way, so the case is as large as the limit requires.
import type {ArraySlice} from './arraySlice.d.ts';
declare function f<Value>(values: ArraySlice<readonly [0, Value] | readonly [0, Value, Value], 1>): void;
declare const x: ArraySlice<readonly [0, {id: 'row'}] | readonly [0, {id: 'row'}, {id: 'row'}], 1>;
f(x);
