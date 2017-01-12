//// [promised.ts]

var p00: Promise<boolean>;
var p01: Promise<Promise<boolean>>;
var p02: Promise<PromiseLike<boolean>>;
var p03: Promise<{ then(cb: (value: boolean) => any): any; }>;
var p04: boolean | Promise<boolean>;
var p05: promised Promise<boolean>;
var p06: promised Promise<Promise<boolean>>;
var p07: promised Promise<PromiseLike<boolean>>;
var p08: promised Promise<{ then(cb: (value: boolean) => any): any; }>;
var p09: promised (boolean | Promise<boolean>);
var p0a: { a: "A", b: Promise<"B"> };
var p0b: Promise<{ a: "A", b: Promise<"B"> }>;
const cp0 = { p00, p01, p02, p03, p04, p05, p06, p07, p08, p09 };

function f00() { var p: promised typeof p00; return p; }
function f01() { var p: promised typeof p01; return p; }
function f02() { var p: promised typeof p02; return p; }
function f03() { var p: promised typeof p03; return p; }
function f04() { var p: promised typeof p04; return p; }
function f05() { return p05; }
function f06() { return p06; }
function f07() { return p07; }
function f08() { return p08; }
function f09() { return p09; }

function f10<T>(x: T) { var p: promised T; return p; }
const c10p00 = f10(p00);
const c10p01 = f10(p01);
const c10p02 = f10(p02);
const c10p03 = f10(p03);
const c10p04 = f10(p04);
const c10p05 = f10(p05);
const c10p06 = f10(p06);
const c10p07 = f10(p07);
const c10p08 = f10(p08);
const c10p09 = f10(p09);

function f11<T>(x: T) { var y: { [P in keyof T]: promised T[P] }; return y; }
const f11c00 = f11(cp0);

function f12<T, K extends keyof T>(x: T, ...k: K[]) { var y: { [P in K]: promised T[K]; }; return y; }
const f12c00 = f12(cp0, "p00");
const f12c01 = f12(cp0, "p01");
const f12c02 = f12(cp0, "p02");
const f12c03 = f12(cp0, "p03");
const f12c04 = f12(cp0, "p04");
const f12c05 = f12(cp0, "p05");
const f12c06 = f12(cp0, "p06");
const f12c07 = f12(cp0, "p07");
const f12c08 = f12(cp0, "p08");
const f12c09 = f12(cp0, "p09");
const f12c00c05 = f12(cp0, "p00", "p05");
const f12c04c09 = f12(cp0, "p04", "p09");

type t00 = { [P in promised "a"]: P; };
var t00v00: t00;
const t00v00c00 = t00v00.a;

type t01 = { [P in promised Promise<"b">]: P; };
var t01v00: t01;
const t01v00c00 = t01v00.b;

type t02 = { [P in promised ("a" | Promise<"b">)]: P; };
var t02v00: t02;
const t02v00c00 = t02v00.a;
const t02v00c01 = t02v00.b;

type t03<T> = { [P in keyof promised T]: promised (promised T)[P]; };
var t03v00: t03<typeof p0a>;
const t03v00c00 = t03v00.a;
const t03v00c01 = t03v00.b;
var t03v01: t03<typeof p0b>;
const t03v01c00 = t03v01.a;
const t03v01c01 = t03v01.b;

function f13<T>(x: T) { var y: t03<T>; return y; }
const f13c00 = f13(p0a);
const f13c00c00 = f13c00.a;
const f13c00c01 = f13c00.b;
const f13c01 = f13(p0b);
const f13c01c00 = f13c01.a;
const f13c01c01 = f13c01.b;

//// [promised.js]
var p00;
var p01;
var p02;
var p03;
var p04;
var p05;
var p06;
var p07;
var p08;
var p09;
var p0a;
var p0b;
const cp0 = { p00, p01, p02, p03, p04, p05, p06, p07, p08, p09 };
function f00() { var p; return p; }
function f01() { var p; return p; }
function f02() { var p; return p; }
function f03() { var p; return p; }
function f04() { var p; return p; }
function f05() { return p05; }
function f06() { return p06; }
function f07() { return p07; }
function f08() { return p08; }
function f09() { return p09; }
function f10(x) { var p; return p; }
const c10p00 = f10(p00);
const c10p01 = f10(p01);
const c10p02 = f10(p02);
const c10p03 = f10(p03);
const c10p04 = f10(p04);
const c10p05 = f10(p05);
const c10p06 = f10(p06);
const c10p07 = f10(p07);
const c10p08 = f10(p08);
const c10p09 = f10(p09);
function f11(x) { var y; return y; }
const f11c00 = f11(cp0);
function f12(x, ...k) { var y; return y; }
const f12c00 = f12(cp0, "p00");
const f12c01 = f12(cp0, "p01");
const f12c02 = f12(cp0, "p02");
const f12c03 = f12(cp0, "p03");
const f12c04 = f12(cp0, "p04");
const f12c05 = f12(cp0, "p05");
const f12c06 = f12(cp0, "p06");
const f12c07 = f12(cp0, "p07");
const f12c08 = f12(cp0, "p08");
const f12c09 = f12(cp0, "p09");
const f12c00c05 = f12(cp0, "p00", "p05");
const f12c04c09 = f12(cp0, "p04", "p09");
var t00v00;
const t00v00c00 = t00v00.a;
var t01v00;
const t01v00c00 = t01v00.b;
var t02v00;
const t02v00c00 = t02v00.a;
const t02v00c01 = t02v00.b;
var t03v00;
const t03v00c00 = t03v00.a;
const t03v00c01 = t03v00.b;
var t03v01;
const t03v01c00 = t03v01.a;
const t03v01c01 = t03v01.b;
function f13(x) { var y; return y; }
const f13c00 = f13(p0a);
const f13c00c00 = f13c00.a;
const f13c00c01 = f13c00.b;
const f13c01 = f13(p0b);
const f13c01c00 = f13c01.a;
const f13c01c01 = f13c01.b;


//// [promised.d.ts]
declare var p00: Promise<boolean>;
declare var p01: Promise<Promise<boolean>>;
declare var p02: Promise<PromiseLike<boolean>>;
declare var p03: Promise<{
    then(cb: (value: boolean) => any): any;
}>;
declare var p04: boolean | Promise<boolean>;
declare var p05: promised Promise<boolean>;
declare var p06: promised Promise<Promise<boolean>>;
declare var p07: promised Promise<PromiseLike<boolean>>;
declare var p08: promised Promise<{
    then(cb: (value: boolean) => any): any;
}>;
declare var p09: promised (boolean | Promise<boolean>);
declare var p0a: {
    a: "A";
    b: Promise<"B">;
};
declare var p0b: Promise<{
    a: "A";
    b: Promise<"B">;
}>;
declare const cp0: {
    p00: Promise<boolean>;
    p01: Promise<Promise<boolean>>;
    p02: Promise<PromiseLike<boolean>>;
    p03: Promise<{
        then(cb: (value: boolean) => any): any;
    }>;
    p04: boolean | Promise<boolean>;
    p05: boolean;
    p06: boolean;
    p07: boolean;
    p08: boolean;
    p09: boolean;
};
declare function f00(): boolean;
declare function f01(): boolean;
declare function f02(): boolean;
declare function f03(): boolean;
declare function f04(): boolean;
declare function f05(): boolean;
declare function f06(): boolean;
declare function f07(): boolean;
declare function f08(): boolean;
declare function f09(): boolean;
declare function f10<T>(x: T): promised T;
declare const c10p00: boolean;
declare const c10p01: boolean;
declare const c10p02: boolean;
declare const c10p03: boolean;
declare const c10p04: boolean;
declare const c10p05: boolean;
declare const c10p06: boolean;
declare const c10p07: boolean;
declare const c10p08: boolean;
declare const c10p09: boolean;
declare function f11<T>(x: T): {
    [P in keyof T]: promised T[P];
};
declare const f11c00: {
    p00: boolean;
    p01: boolean;
    p02: boolean;
    p03: boolean;
    p04: boolean;
    p05: boolean;
    p06: boolean;
    p07: boolean;
    p08: boolean;
    p09: boolean;
};
declare function f12<T, K extends keyof T>(x: T, ...k: K[]): {
    [P in K]: promised T[K];
};
declare const f12c00: {
    p00: boolean;
};
declare const f12c01: {
    p01: boolean;
};
declare const f12c02: {
    p02: boolean;
};
declare const f12c03: {
    p03: boolean;
};
declare const f12c04: {
    p04: boolean;
};
declare const f12c05: {
    p05: boolean;
};
declare const f12c06: {
    p06: boolean;
};
declare const f12c07: {
    p07: boolean;
};
declare const f12c08: {
    p08: boolean;
};
declare const f12c09: {
    p09: boolean;
};
declare const f12c00c05: {
    p00: boolean;
    p05: boolean;
};
declare const f12c04c09: {
    p04: boolean;
    p09: boolean;
};
declare type t00 = {
    [P in promised "a"]: P;
};
declare var t00v00: t00;
declare const t00v00c00: "a";
declare type t01 = {
    [P in promised Promise<"b">]: P;
};
declare var t01v00: t01;
declare const t01v00c00: "b";
declare type t02 = {
    [P in promised ("a" | Promise<"b">)]: P;
};
declare var t02v00: t02;
declare const t02v00c00: "a";
declare const t02v00c01: "b";
declare type t03<T> = {
    [P in keyof promised T]: promised (promised T)[P];
};
declare var t03v00: t03<typeof p0a>;
declare const t03v00c00: "A";
declare const t03v00c01: "B";
declare var t03v01: t03<typeof p0b>;
declare const t03v01c00: "A";
declare const t03v01c01: "B";
declare function f13<T>(x: T): t03<T>;
declare const f13c00: t03<{
    a: "A";
    b: Promise<"B">;
}>;
declare const f13c00c00: "A";
declare const f13c00c01: "B";
declare const f13c01: t03<Promise<{
    a: "A";
    b: Promise<"B">;
}>>;
declare const f13c01c00: "A";
declare const f13c01c01: "B";
