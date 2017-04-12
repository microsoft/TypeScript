//// [taggedTemplateStringsTypeArgumentInference.ts]
// Generic tag with one parameter
function noParams<T>(n: T) { }
noParams ``;

// Generic tag with parameter which does not use type parameter
function noGenericParams<T>(n: TemplateStringsArray) { }
noGenericParams ``;

// Generic tag with multiple type parameters and only one used in parameter type annotation
function someGenerics1a<T, U>(n: T, m: number) { }
someGenerics1a `${3}`;

function someGenerics1b<T, U>(n: TemplateStringsArray, m: U) { }
someGenerics1b `${3}`;

// Generic tag with argument of function type whose parameter is of type parameter type
function someGenerics2a<T>(strs: TemplateStringsArray, n: (x: T) => void) { }
someGenerics2a `${(n: string) => n}`;

function someGenerics2b<T, U>(strs: TemplateStringsArray, n: (x: T, y: U) => void) { }
someGenerics2b `${ (n: string, x: number) => n }`;

// Generic tag with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3<T>(strs: TemplateStringsArray, producer: () => T) { }
someGenerics3 `${() => ''}`;
someGenerics3 `${() => undefined}`;
someGenerics3 `${() => 3}`;

// 2 parameter generic tag with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4<T, U>(strs: TemplateStringsArray, n: T, f: (x: U) => void) { }
someGenerics4 `${4}${ () => null }`;
someGenerics4 `${''}${ () => 3 }`;
someGenerics4 `${ null }${ null }`;

// 2 parameter generic tag with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5<U, T>(strs: TemplateStringsArray, n: T, f: (x: U) => void) { }
someGenerics5 `${ 4 } ${ () => null }`;
someGenerics5 `${ '' }${ () => 3 }`;
someGenerics5 `${null}${null}`;

// Generic tag with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6<A>(strs: TemplateStringsArray, a: (a: A) => A, b: (b: A) => A, c: (c: A) => A) { }
someGenerics6 `${ n => n }${ n => n}${ n => n}`;
someGenerics6 `${ n => n }${ n => n}${ n => n}`;
someGenerics6 `${ (n: number) => n }${ (n: number) => n }${ (n: number) => n }`;

// Generic tag with multiple arguments of function types that each have parameters of different generic type
function someGenerics7<A, B, C>(strs: TemplateStringsArray, a: (a: A) => A, b: (b: B) => B, c: (c: C) => C) { }
someGenerics7 `${ n => n }${ n => n }${ n => n }`;
someGenerics7 `${ n => n }${ n => n }${ n => n }`;
someGenerics7 `${(n: number) => n}${ (n: string) => n}${ (n: number) => n}`;

// Generic tag with argument of generic function type
function someGenerics8<T>(strs: TemplateStringsArray, n: T): T { return n; }
var x = someGenerics8 `${ someGenerics7 }`;
x `${null}${null}${null}`;

// Generic tag with multiple parameters of generic type passed arguments with no best common type
function someGenerics9<T>(strs: TemplateStringsArray, a: T, b: T, c: T): T {
    return null;
}
var a9a = someGenerics9 `${ '' }${ 0 }${ [] }`;
var a9a: {};

// Generic tag with multiple parameters of generic type passed arguments with multiple best common types
interface A91 {
    x: number;
    y?: string;
}
interface A92 {
    x: number;
    z?: Date;
}

var a9e = someGenerics9 `${ undefined }${ { x: 6, z: new Date() } }${ { x: 6, y: '' } }`;
var a9e: {};

// Generic tag with multiple parameters of generic type passed arguments with a single best common type
var a9d = someGenerics9 `${ { x: 3 }}${ { x: 6 }}${ { x: 6 } }`;
var a9d: { x: number; };

// Generic tag with multiple parameters of generic type where one argument is of type 'any'
var anyVar: any;
var a = someGenerics9 `${ 7 }${ anyVar }${ 4 }`;
var a: any;

// Generic tag with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = someGenerics9 `${ [] }${ null }${ undefined }`;
var arr: any[];



//// [taggedTemplateStringsTypeArgumentInference.js]
// Generic tag with one parameter
function noParams(n) { }
(_a = [""], _a.raw = [""], noParams(_a));
// Generic tag with parameter which does not use type parameter
function noGenericParams(n) { }
(_b = [""], _b.raw = [""], noGenericParams(_b));
// Generic tag with multiple type parameters and only one used in parameter type annotation
function someGenerics1a(n, m) { }
(_c = ["", ""], _c.raw = ["", ""], someGenerics1a(_c, 3));
function someGenerics1b(n, m) { }
(_d = ["", ""], _d.raw = ["", ""], someGenerics1b(_d, 3));
// Generic tag with argument of function type whose parameter is of type parameter type
function someGenerics2a(strs, n) { }
(_e = ["", ""], _e.raw = ["", ""], someGenerics2a(_e, function (n) { return n; }));
function someGenerics2b(strs, n) { }
(_f = ["", ""], _f.raw = ["", ""], someGenerics2b(_f, function (n, x) { return n; }));
// Generic tag with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3(strs, producer) { }
(_g = ["", ""], _g.raw = ["", ""], someGenerics3(_g, function () { return ''; }));
(_h = ["", ""], _h.raw = ["", ""], someGenerics3(_h, function () { return undefined; }));
(_j = ["", ""], _j.raw = ["", ""], someGenerics3(_j, function () { return 3; }));
// 2 parameter generic tag with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4(strs, n, f) { }
(_k = ["", "", ""], _k.raw = ["", "", ""], someGenerics4(_k, 4, function () { return null; }));
(_l = ["", "", ""], _l.raw = ["", "", ""], someGenerics4(_l, '', function () { return 3; }));
(_m = ["", "", ""], _m.raw = ["", "", ""], someGenerics4(_m, null, null));
// 2 parameter generic tag with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5(strs, n, f) { }
(_o = ["", " ", ""], _o.raw = ["", " ", ""], someGenerics5(_o, 4, function () { return null; }));
(_p = ["", "", ""], _p.raw = ["", "", ""], someGenerics5(_p, '', function () { return 3; }));
(_q = ["", "", ""], _q.raw = ["", "", ""], someGenerics5(_q, null, null));
// Generic tag with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6(strs, a, b, c) { }
(_r = ["", "", "", ""], _r.raw = ["", "", "", ""], someGenerics6(_r, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_s = ["", "", "", ""], _s.raw = ["", "", "", ""], someGenerics6(_s, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_t = ["", "", "", ""], _t.raw = ["", "", "", ""], someGenerics6(_t, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
// Generic tag with multiple arguments of function types that each have parameters of different generic type
function someGenerics7(strs, a, b, c) { }
(_u = ["", "", "", ""], _u.raw = ["", "", "", ""], someGenerics7(_u, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_v = ["", "", "", ""], _v.raw = ["", "", "", ""], someGenerics7(_v, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_w = ["", "", "", ""], _w.raw = ["", "", "", ""], someGenerics7(_w, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
// Generic tag with argument of generic function type
function someGenerics8(strs, n) { return n; }
var x = (_x = ["", ""], _x.raw = ["", ""], someGenerics8(_x, someGenerics7));
(_y = ["", "", "", ""], _y.raw = ["", "", "", ""], x(_y, null, null, null));
// Generic tag with multiple parameters of generic type passed arguments with no best common type
function someGenerics9(strs, a, b, c) {
    return null;
}
var a9a = (_z = ["", "", "", ""], _z.raw = ["", "", "", ""], someGenerics9(_z, '', 0, []));
var a9a;
var a9e = (_0 = ["", "", "", ""], _0.raw = ["", "", "", ""], someGenerics9(_0, undefined, { x: 6, z: new Date() }, { x: 6, y: '' }));
var a9e;
// Generic tag with multiple parameters of generic type passed arguments with a single best common type
var a9d = (_1 = ["", "", "", ""], _1.raw = ["", "", "", ""], someGenerics9(_1, { x: 3 }, { x: 6 }, { x: 6 }));
var a9d;
// Generic tag with multiple parameters of generic type where one argument is of type 'any'
var anyVar;
var a = (_2 = ["", "", "", ""], _2.raw = ["", "", "", ""], someGenerics9(_2, 7, anyVar, 4));
var a;
// Generic tag with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = (_3 = ["", "", "", ""], _3.raw = ["", "", "", ""], someGenerics9(_3, [], null, undefined));
var arr;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
