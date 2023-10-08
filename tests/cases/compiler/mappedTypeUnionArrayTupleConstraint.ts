// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56018

type Renamed = readonly ({ [k: PropertyKey]: string } | undefined)[];

type Foo<T extends readonly (PropertyKey | undefined)[] | Renamed> =
  T extends Renamed ? GetKeys<Required<T>> : Required<T>;

type GetKeys<R extends Renamed> = { [K in keyof R]: keyof R[K] };

// usage
type A = Foo<["a"?]>;
type B = Foo<[{ a?: "b" }]>;
