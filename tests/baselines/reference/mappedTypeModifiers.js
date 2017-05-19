//// [mappedTypeModifiers.ts]
type T = { a: number, b: string };
type TP = { a?: number, b?: string };
type TR = { readonly a: number, readonly b: string };
type TPR = { readonly a?: number, readonly b?: string };

var v00: "a" | "b";
var v00: keyof T;
var v00: keyof TP;
var v00: keyof TR;
var v00: keyof TPR;

var v01: T;
var v01: { [P in keyof T]: T[P] };
var v01: Pick<T, keyof T>;
var v01: Pick<Pick<T, keyof T>, keyof T>;

var v02: TP;
var v02: { [P in keyof T]?: T[P] };
var v02: Partial<T>;
var v02: { [P in keyof TP]: TP[P] }
var v02: Pick<TP, keyof TP>;

var v03: TR;
var v03: { readonly [P in keyof T]: T[P] };
var v03: Readonly<T>;
var v03: { [P in keyof TR]: TR[P] }
var v03: Pick<TR, keyof TR>;

var v04: TPR;
var v04: { readonly [P in keyof T]?: T[P] };
var v04: Partial<TR>;
var v04: Readonly<TP>;
var v04: Partial<Readonly<T>>;
var v04: Readonly<Partial<T>>;
var v04: { [P in keyof TPR]: TPR[P] }
var v04: Pick<TPR, keyof T>;

type Boxified<T> = { [P in keyof T]: { x: T[P] } };

type B = { a: { x: number }, b: { x: string } };
type BP = { a?: { x: number }, b?: { x: string } };
type BR = { readonly a: { x: number }, readonly b: { x: string } };
type BPR = { readonly a?: { x: number }, readonly b?: { x: string } };

var b00: "a" | "b";
var b00: keyof B;
var b00: keyof BP;
var b00: keyof BR;
var b00: keyof BPR;

var b01: B;
var b01: { [P in keyof B]: B[P] };
var b01: Pick<B, keyof B>;
var b01: Pick<Pick<B, keyof B>, keyof B>;

var b02: BP;
var b02: { [P in keyof B]?: B[P] };
var b02: Partial<B>;
var b02: { [P in keyof BP]: BP[P] }
var b02: Pick<BP, keyof BP>;

var b03: BR;
var b03: { readonly [P in keyof B]: B[P] };
var b03: Readonly<B>;
var b03: { [P in keyof BR]: BR[P] }
var b03: Pick<BR, keyof BR>;

var b04: BPR;
var b04: { readonly [P in keyof B]?: B[P] };
var b04: Partial<BR>;
var b04: Readonly<BP>;
var b04: Partial<Readonly<B>>;
var b04: Readonly<Partial<B>>;
var b04: { [P in keyof BPR]: BPR[P] }
var b04: Pick<BPR, keyof BPR>;

type Foo = { prop: number, [x: string]: number };

function f1(x: Partial<Foo>) {
    x.prop; // ok
    (x["other"] || 0).toFixed();
}

function f2(x: Readonly<Foo>) {
    x.prop; // ok
    x["other"].toFixed();
}

function f3(x: Boxified<Foo>) {
    x.prop; // ok
    x["other"].x.toFixed();
}

function f4(x: { [P in keyof Foo]: Foo[P] }) {
    x.prop; // ok
    x["other"].toFixed();
}


//// [mappedTypeModifiers.js]
var v00;
var v00;
var v00;
var v00;
var v00;
var v01;
var v01;
var v01;
var v01;
var v02;
var v02;
var v02;
var v02;
var v02;
var v03;
var v03;
var v03;
var v03;
var v03;
var v04;
var v04;
var v04;
var v04;
var v04;
var v04;
var v04;
var v04;
var b00;
var b00;
var b00;
var b00;
var b00;
var b01;
var b01;
var b01;
var b01;
var b02;
var b02;
var b02;
var b02;
var b02;
var b03;
var b03;
var b03;
var b03;
var b03;
var b04;
var b04;
var b04;
var b04;
var b04;
var b04;
var b04;
var b04;
function f1(x) {
    x.prop; // ok
    (x["other"] || 0).toFixed();
}
function f2(x) {
    x.prop; // ok
    x["other"].toFixed();
}
function f3(x) {
    x.prop; // ok
    x["other"].x.toFixed();
}
function f4(x) {
    x.prop; // ok
    x["other"].toFixed();
}
