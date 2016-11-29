// @strictNullChecks: true

type T = { a: number, b: string };
type TU = { a: number | undefined, b: string | undefined };
type TP = { a?: number, b?: string };
type TR = { readonly a: number, readonly b: string };
type TPR = { readonly a?: number, readonly b?: string };

// Validate they all have the same keys
var v00: "a" | "b";
var v00: keyof T;
var v00: keyof TU;
var v00: keyof TP;
var v00: keyof TR;
var v00: keyof TPR;

// Validate that non-isomorphic mapped types strip modifiers
var v01: T;
var v01: Pick<TR, keyof T>;
var v01: Pick<Readonly<T>, keyof T>;

// Validate that non-isomorphic mapped types strip modifiers
var v02: TU;
var v02: Pick<TP, keyof T>;
var v02: Pick<TPR, keyof T>;
var v02: Pick<Partial<T>, keyof T>;
var v02: Pick<Partial<Readonly<T>>, keyof T>;

// Validate that isomorphic mapped types preserve optional modifier
var v03: TP;
var v03: Partial<T>;

// Validate that isomorphic mapped types preserve readonly modifier
var v04: TR;
var v04: Readonly<T>;

// Validate that isomorphic mapped types preserve both partial and readonly modifiers
var v05: TPR;
var v05: Partial<TR>;
var v05: Readonly<TP>;
var v05: Partial<Readonly<T>>;
var v05: Readonly<Partial<T>>;

type Boxified<T> = { [P in keyof T]: { x: T[P] } };

type B = { a: { x: number }, b: { x: string } };
type BU = { a: { x: number } | undefined, b: { x: string } | undefined };
type BP = { a?: { x: number }, b?: { x: string } };
type BR = { readonly a: { x: number }, readonly b: { x: string } };
type BPR = { readonly a?: { x: number }, readonly b?: { x: string } };

// Validate they all have the same keys
var b00: "a" | "b";
var b00: keyof B;
var b00: keyof BU;
var b00: keyof BP;
var b00: keyof BR;
var b00: keyof BPR;

// Validate that non-isomorphic mapped types strip modifiers
var b01: B;
var b01: Pick<BR, keyof B>;
var b01: Pick<Readonly<BR>, keyof B>;

// Validate that non-isomorphic mapped types strip modifiers
var b02: BU;
var b02: Pick<BP, keyof B>;
var b02: Pick<BPR, keyof B>;
var b02: Pick<Partial<B>, keyof B>;
var b02: Pick<Partial<Readonly<B>>, keyof B>;

// Validate that isomorphic mapped types preserve optional modifier
var b03: BP;
var b03: Partial<B>;

// Validate that isomorphic mapped types preserve readonly modifier
var b04: BR;
var b04: Readonly<B>;

// Validate that isomorphic mapped types preserve both partial and readonly modifiers
var b05: BPR;
var b05: Partial<BR>;
var b05: Readonly<BP>;
var b05: Partial<Readonly<B>>;
var b05: Readonly<Partial<B>>;