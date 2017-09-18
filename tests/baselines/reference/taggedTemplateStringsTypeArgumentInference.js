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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
// Generic tag with one parameter
function noParams(n) { }
noParams(_a || (_a = __makeTemplateObject([""], [""])));
// Generic tag with parameter which does not use type parameter
function noGenericParams(n) { }
noGenericParams(_b || (_b = __makeTemplateObject([""], [""])));
// Generic tag with multiple type parameters and only one used in parameter type annotation
function someGenerics1a(n, m) { }
someGenerics1a(_c || (_c = __makeTemplateObject(["", ""], ["", ""])), 3);
function someGenerics1b(n, m) { }
someGenerics1b(_d || (_d = __makeTemplateObject(["", ""], ["", ""])), 3);
// Generic tag with argument of function type whose parameter is of type parameter type
function someGenerics2a(strs, n) { }
someGenerics2a(_e || (_e = __makeTemplateObject(["", ""], ["", ""])), function (n) { return n; });
function someGenerics2b(strs, n) { }
someGenerics2b(_f || (_f = __makeTemplateObject(["", ""], ["", ""])), function (n, x) { return n; });
// Generic tag with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3(strs, producer) { }
someGenerics3(_g || (_g = __makeTemplateObject(["", ""], ["", ""])), function () { return ''; });
someGenerics3(_h || (_h = __makeTemplateObject(["", ""], ["", ""])), function () { return undefined; });
someGenerics3(_j || (_j = __makeTemplateObject(["", ""], ["", ""])), function () { return 3; });
// 2 parameter generic tag with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4(strs, n, f) { }
someGenerics4(_k || (_k = __makeTemplateObject(["", "", ""], ["", "", ""])), 4, function () { return null; });
someGenerics4(_l || (_l = __makeTemplateObject(["", "", ""], ["", "", ""])), '', function () { return 3; });
someGenerics4(_m || (_m = __makeTemplateObject(["", "", ""], ["", "", ""])), null, null);
// 2 parameter generic tag with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5(strs, n, f) { }
someGenerics5(_o || (_o = __makeTemplateObject(["", " ", ""], ["", " ", ""])), 4, function () { return null; });
someGenerics5(_p || (_p = __makeTemplateObject(["", "", ""], ["", "", ""])), '', function () { return 3; });
someGenerics5(_q || (_q = __makeTemplateObject(["", "", ""], ["", "", ""])), null, null);
// Generic tag with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6(strs, a, b, c) { }
someGenerics6(_r || (_r = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
someGenerics6(_s || (_s = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
someGenerics6(_t || (_t = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
// Generic tag with multiple arguments of function types that each have parameters of different generic type
function someGenerics7(strs, a, b, c) { }
someGenerics7(_u || (_u = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
someGenerics7(_v || (_v = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
someGenerics7(_w || (_w = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
// Generic tag with argument of generic function type
function someGenerics8(strs, n) { return n; }
var x = someGenerics8(_x || (_x = __makeTemplateObject(["", ""], ["", ""])), someGenerics7);
x(_y || (_y = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), null, null, null);
// Generic tag with multiple parameters of generic type passed arguments with no best common type
function someGenerics9(strs, a, b, c) {
    return null;
}
var a9a = someGenerics9(_z || (_z = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), '', 0, []);
var a9a;
var a9e = someGenerics9(_0 || (_0 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), undefined, { x: 6, z: new Date() }, { x: 6, y: '' });
var a9e;
// Generic tag with multiple parameters of generic type passed arguments with a single best common type
var a9d = someGenerics9(_1 || (_1 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), { x: 3 }, { x: 6 }, { x: 6 });
var a9d;
// Generic tag with multiple parameters of generic type where one argument is of type 'any'
var anyVar;
var a = someGenerics9(_2 || (_2 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), 7, anyVar, 4);
var a;
// Generic tag with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = someGenerics9(_3 || (_3 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), [], null, undefined);
var arr;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
