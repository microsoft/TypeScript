//// [templateLiteralTypes2.ts]
function ft1<T extends string>(s: string, n: number, u: 'foo' | 'bar' | 'baz', t: T) {
    const c1 = `abc${s}`;  // `abc${string}`
    const c2 = `abc${n}`;  // `abc${number}`
    const c3 = `abc${u}`;  // "abcfoo" | "abcbar" | "abcbaz"
    const c4 = `abc${t}`;  // `abc${T}
    const d1: `abc${string}` = `abc${s}`;
    const d2: `abc${number}` = `abc${n}`;
    const d3: `abc${'foo' | 'bar' | 'baz'}` = `abc${u}`;
    const d4: `abc${T}` = `abc${t}`;
}

function ft2(s: string) {
    return `abc${s}`;
}

function ft10(s: string) {
    const c1 = `abc${s}`;  // Widening type `abc${string}`
    let v1 = c1;  // Type string
    const c2 = c1;  // Widening type `abc${string}`
    let v2 = c2;  // Type string
    const c3: `abc${string}` = `abc${s}`;
    let v3 = c3;  // Type `abc${string}`
    const c4: `abc${string}` = c1;  // Type `abc${string}`
    let v4 = c4;  // Type `abc${string}`
}

function ft11(s: string, cond: boolean) {
    const c1 = cond ? `foo${s}` : `bar${s}`;  // widening `foo${string}` | widening `bar${string}`
    const c2: `foo${string}` | `bar${string}` = c1;  // `foo${string}` | `bar${string}`
    const c3 = cond ? c1 : c2;  // `foo${string}` | `bar${string}`
    const c4 = cond ? c3 : `baz${s}`;  // `foo${string}` | `bar${string}` | widening `baz${string}`
    const c5: `foo${string}` | `bar${string}` | `baz${string}` = c4; // `foo${string}` | `bar${string}` | `baz${string}`
    let v1 = c1;  // string
    let v2 = c2;  // `foo${string}` | `bar${string}`
    let v3 = c3;  // `foo${string}` | `bar${string}`
    let v4 = c4;  // string
    let v5 = c5;  // `foo${string}` | `bar${string}` | `baz${string}`
}

function ft12(s: string) {
    const c1 = `foo${s}`;
    let v1 = c1;
    const c2: `foo${string}` = `foo${s}`;
    let v2 = c2;
    const c3 = `foo${s}` as `foo${string}`;
    let v3 = c3;
    const c4 = <`foo${string}`>`foo${s}`;
    let v4 = c4;
    const c5 = `foo${s}` as const;
    let v5 = c5;
}

declare function widening<T>(x: T): T;
declare function nonWidening<T extends string | number | symbol>(x: T): T;

function ft13(s: string, cond: boolean) {
    let x1 = widening(`foo${s}`);
    let x2 = widening(cond ? 'a' : `foo${s}`);
    let y1 = nonWidening(`foo${s}`);
    let y2 = nonWidening(cond ? 'a' : `foo${s}`);
}

type T0 = string | `${number}px`;

function ft14(t: `foo${number}`) {
    let x1: string = t;
    let x2: String = t;
    let x3: Object = t;
    let x4: {} = t;
    let x6: { length: number } = t;
}

declare function g1<T>(x: T): T;
declare function g2<T extends string>(x: T): T;

function ft20(s: string) {
    let x1 = g1(`xyz-${s}`);  // string
    let x2 = g2(`xyz-${s}`);  // `xyz-${string}`
}

// Repro from #41631

declare function takesLiteral<T extends string>(literal: T): T extends `foo.bar.${infer R}` ? R : unknown;

const t1 = takesLiteral("foo.bar.baz"); // "baz"
const id2 = "foo.bar.baz";
const t2 = takesLiteral(id2); // "baz"

declare const someString: string;
const t3 = takesLiteral(`foo.bar.${someString}`);  // string

const id4 = `foo.bar.${someString}`;
const t4 = takesLiteral(id4);  // string

declare const someUnion: 'abc' | 'def' | 'ghi';
const t5 = takesLiteral(`foo.bar.${someUnion}`);  // "abc" | "def" | "ghi"

// Repro from #41732

const pixelValue: number = 22;

type PixelValueType = `${number}px`;

const pixelString: PixelValueType = `22px`;

const pixelStringWithTemplate: PixelValueType = `${pixelValue}px`;

// Repro from #43143

function getCardTitle(title: string): `test-${string}` {
    return `test-${title}`;
}

// Repro from #43424

const interpolatedStyle = { rotate: 12 };
function C2(transform: "-moz-initial" | (string & {})) { return 12; }
C2(`rotate(${interpolatedStyle.rotate}dig)`);


//// [templateLiteralTypes2.js]
"use strict";
function ft1(s, n, u, t) {
    var c1 = "abc".concat(s); // `abc${string}`
    var c2 = "abc".concat(n); // `abc${number}`
    var c3 = "abc".concat(u); // "abcfoo" | "abcbar" | "abcbaz"
    var c4 = "abc".concat(t); // `abc${T}
    var d1 = "abc".concat(s);
    var d2 = "abc".concat(n);
    var d3 = "abc".concat(u);
    var d4 = "abc".concat(t);
}
function ft2(s) {
    return "abc".concat(s);
}
function ft10(s) {
    var c1 = "abc".concat(s); // Widening type `abc${string}`
    var v1 = c1; // Type string
    var c2 = c1; // Widening type `abc${string}`
    var v2 = c2; // Type string
    var c3 = "abc".concat(s);
    var v3 = c3; // Type `abc${string}`
    var c4 = c1; // Type `abc${string}`
    var v4 = c4; // Type `abc${string}`
}
function ft11(s, cond) {
    var c1 = cond ? "foo".concat(s) : "bar".concat(s); // widening `foo${string}` | widening `bar${string}`
    var c2 = c1; // `foo${string}` | `bar${string}`
    var c3 = cond ? c1 : c2; // `foo${string}` | `bar${string}`
    var c4 = cond ? c3 : "baz".concat(s); // `foo${string}` | `bar${string}` | widening `baz${string}`
    var c5 = c4; // `foo${string}` | `bar${string}` | `baz${string}`
    var v1 = c1; // string
    var v2 = c2; // `foo${string}` | `bar${string}`
    var v3 = c3; // `foo${string}` | `bar${string}`
    var v4 = c4; // string
    var v5 = c5; // `foo${string}` | `bar${string}` | `baz${string}`
}
function ft12(s) {
    var c1 = "foo".concat(s);
    var v1 = c1;
    var c2 = "foo".concat(s);
    var v2 = c2;
    var c3 = "foo".concat(s);
    var v3 = c3;
    var c4 = "foo".concat(s);
    var v4 = c4;
    var c5 = "foo".concat(s);
    var v5 = c5;
}
function ft13(s, cond) {
    var x1 = widening("foo".concat(s));
    var x2 = widening(cond ? 'a' : "foo".concat(s));
    var y1 = nonWidening("foo".concat(s));
    var y2 = nonWidening(cond ? 'a' : "foo".concat(s));
}
function ft14(t) {
    var x1 = t;
    var x2 = t;
    var x3 = t;
    var x4 = t;
    var x6 = t;
}
function ft20(s) {
    var x1 = g1("xyz-".concat(s)); // string
    var x2 = g2("xyz-".concat(s)); // `xyz-${string}`
}
var t1 = takesLiteral("foo.bar.baz"); // "baz"
var id2 = "foo.bar.baz";
var t2 = takesLiteral(id2); // "baz"
var t3 = takesLiteral("foo.bar.".concat(someString)); // string
var id4 = "foo.bar.".concat(someString);
var t4 = takesLiteral(id4); // string
var t5 = takesLiteral("foo.bar.".concat(someUnion)); // "abc" | "def" | "ghi"
// Repro from #41732
var pixelValue = 22;
var pixelString = "22px";
var pixelStringWithTemplate = "".concat(pixelValue, "px");
// Repro from #43143
function getCardTitle(title) {
    return "test-".concat(title);
}
// Repro from #43424
var interpolatedStyle = { rotate: 12 };
function C2(transform) { return 12; }
C2("rotate(".concat(interpolatedStyle.rotate, "dig)"));


//// [templateLiteralTypes2.d.ts]
declare function ft1<T extends string>(s: string, n: number, u: 'foo' | 'bar' | 'baz', t: T): void;
declare function ft2(s: string): string;
declare function ft10(s: string): void;
declare function ft11(s: string, cond: boolean): void;
declare function ft12(s: string): void;
declare function widening<T>(x: T): T;
declare function nonWidening<T extends string | number | symbol>(x: T): T;
declare function ft13(s: string, cond: boolean): void;
declare type T0 = string | `${number}px`;
declare function ft14(t: `foo${number}`): void;
declare function g1<T>(x: T): T;
declare function g2<T extends string>(x: T): T;
declare function ft20(s: string): void;
declare function takesLiteral<T extends string>(literal: T): T extends `foo.bar.${infer R}` ? R : unknown;
declare const t1: "baz";
declare const id2 = "foo.bar.baz";
declare const t2: "baz";
declare const someString: string;
declare const t3: string;
declare const id4: string;
declare const t4: unknown;
declare const someUnion: 'abc' | 'def' | 'ghi';
declare const t5: "abc" | "def" | "ghi";
declare const pixelValue: number;
declare type PixelValueType = `${number}px`;
declare const pixelString: PixelValueType;
declare const pixelStringWithTemplate: PixelValueType;
declare function getCardTitle(title: string): `test-${string}`;
declare const interpolatedStyle: {
    rotate: number;
};
declare function C2(transform: "-moz-initial" | (string & {})): number;
