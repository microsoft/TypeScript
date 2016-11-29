// @strictNullChecks: true

type T = { a: number, b: string };
type U = { a: number | undefined, b: string | undefined };
type P = { a?: number, b?: string };
type R = { readonly a: number, readonly b: string };
type PR = { readonly a?: number, readonly b?: string };

// Validate they all have the same keys
var v00: "a" | "b";
var v00: keyof T;
var v00: keyof U;
var v00: keyof P;
var v00: keyof R;
var v00: keyof PR;

// Validate that non-isomorphic mapped types strip modifiers
var v01: T;
var v01: Pick<R, keyof T>;
var v01: Pick<Readonly<T>, keyof T>;

// Validate that non-isomorphic mapped types strip modifiers
var v02: U;
var v02: Pick<P, keyof T>;
var v02: Pick<PR, keyof T>;
var v02: Pick<Partial<T>, keyof T>;
var v02: Pick<Partial<Readonly<T>>, keyof T>;

// Validate that isomorphic mapped types preserve optional modifier
var v03: P;
var v03: Partial<T>;

// Validate that isomorphic mapped types preserve readonly modifier
var v04: R;
var v04: Readonly<T>;

// Validate that isomorphic mapped types preserve both partial and readonly modifiers
var v05: PR;
var v05: Partial<R>;
var v05: Readonly<P>;
var v05: Partial<Readonly<T>>;
var v05: Readonly<Partial<T>>;