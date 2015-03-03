//// [taggedTemplateStringsTypeArgumentInference.ts]


// Generic tag with one parameter
function noParams<T>(n: T) { }
noParams ``;

// Generic tag with parameter which does not use type parameter
function noGenericParams<T>(n: string[]) { }
noGenericParams ``;

// Generic tag with multiple type parameters and only one used in parameter type annotation
function someGenerics1a<T, U>(n: T, m: number) { }
someGenerics1a `${3}`;

function someGenerics1b<T, U>(n: string[], m: U) { }
someGenerics1b `${3}`;

// Generic tag with argument of function type whose parameter is of type parameter type
function someGenerics2a<T>(strs: string[], n: (x: T) => void) { }
someGenerics2a `${(n: string) => n}`;

function someGenerics2b<T, U>(strs: string[], n: (x: T, y: U) => void) { }
someGenerics2b `${ (n: string, x: number) => n }`;

// Generic tag with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3<T>(strs: string[], producer: () => T) { }
someGenerics3 `${() => ''}`;
someGenerics3 `${() => undefined}`;
someGenerics3 `${() => 3}`;

// 2 parameter generic tag with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4<T, U>(strs: string[], n: T, f: (x: U) => void) { }
someGenerics4 `${4}${ () => null }`;
someGenerics4 `${''}${ () => 3 }`;
someGenerics4 `${ null }${ null }`;

// 2 parameter generic tag with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5<U, T>(strs: string[], n: T, f: (x: U) => void) { }
someGenerics5 `${ 4 } ${ () => null }`;
someGenerics5 `${ '' }${ () => 3 }`;
someGenerics5 `${null}${null}`;

// Generic tag with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6<A>(strs: string[], a: (a: A) => A, b: (b: A) => A, c: (c: A) => A) { }
someGenerics6 `${ n => n }${ n => n}${ n => n}`;
someGenerics6 `${ n => n }${ n => n}${ n => n}`;
someGenerics6 `${ (n: number) => n }${ (n: number) => n }${ (n: number) => n }`;

// Generic tag with multiple arguments of function types that each have parameters of different generic type
function someGenerics7<A, B, C>(strs: string[], a: (a: A) => A, b: (b: B) => B, c: (c: C) => C) { }
someGenerics7 `${ n => n }${ n => n }${ n => n }`;
someGenerics7 `${ n => n }${ n => n }${ n => n }`;
someGenerics7 `${(n: number) => n}${ (n: string) => n}${ (n: number) => n}`;

// Generic tag with argument of generic function type
function someGenerics8<T>(strs: string[], n: T): T { return n; }
var x = someGenerics8 `${ someGenerics7 }`;
x `${null}${null}${null}`;

// Generic tag with multiple parameters of generic type passed arguments with no best common type
function someGenerics9<T>(strs: string[], a: T, b: T, c: T): T {
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
(_a_1 = [""], _a_1.raw = [""], noGenericParams(_a_1));
// Generic tag with multiple type parameters and only one used in parameter type annotation
function someGenerics1a(n, m) { }
(_a_2 = ["", ""], _a_2.raw = ["", ""], someGenerics1a(_a_2, 3));
function someGenerics1b(n, m) { }
(_a_3 = ["", ""], _a_3.raw = ["", ""], someGenerics1b(_a_3, 3));
// Generic tag with argument of function type whose parameter is of type parameter type
function someGenerics2a(strs, n) { }
(_a_4 = ["", ""], _a_4.raw = ["", ""], someGenerics2a(_a_4, function (n) { return n; }));
function someGenerics2b(strs, n) { }
(_a_5 = ["", ""], _a_5.raw = ["", ""], someGenerics2b(_a_5, function (n, x) { return n; }));
// Generic tag with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3(strs, producer) { }
(_a_6 = ["", ""], _a_6.raw = ["", ""], someGenerics3(_a_6, function () { return ''; }));
(_a_7 = ["", ""], _a_7.raw = ["", ""], someGenerics3(_a_7, function () { return undefined; }));
(_a_8 = ["", ""], _a_8.raw = ["", ""], someGenerics3(_a_8, function () { return 3; }));
// 2 parameter generic tag with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4(strs, n, f) { }
(_a_9 = ["", "", ""], _a_9.raw = ["", "", ""], someGenerics4(_a_9, 4, function () { return null; }));
(_a_10 = ["", "", ""], _a_10.raw = ["", "", ""], someGenerics4(_a_10, '', function () { return 3; }));
(_a_11 = ["", "", ""], _a_11.raw = ["", "", ""], someGenerics4(_a_11, null, null));
// 2 parameter generic tag with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5(strs, n, f) { }
(_a_12 = ["", " ", ""], _a_12.raw = ["", " ", ""], someGenerics5(_a_12, 4, function () { return null; }));
(_a_13 = ["", "", ""], _a_13.raw = ["", "", ""], someGenerics5(_a_13, '', function () { return 3; }));
(_a_14 = ["", "", ""], _a_14.raw = ["", "", ""], someGenerics5(_a_14, null, null));
// Generic tag with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6(strs, a, b, c) { }
(_a_15 = ["", "", "", ""], _a_15.raw = ["", "", "", ""], someGenerics6(_a_15, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_a_16 = ["", "", "", ""], _a_16.raw = ["", "", "", ""], someGenerics6(_a_16, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_a_17 = ["", "", "", ""], _a_17.raw = ["", "", "", ""], someGenerics6(_a_17, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
// Generic tag with multiple arguments of function types that each have parameters of different generic type
function someGenerics7(strs, a, b, c) { }
(_a_18 = ["", "", "", ""], _a_18.raw = ["", "", "", ""], someGenerics7(_a_18, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_a_19 = ["", "", "", ""], _a_19.raw = ["", "", "", ""], someGenerics7(_a_19, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
(_a_20 = ["", "", "", ""], _a_20.raw = ["", "", "", ""], someGenerics7(_a_20, function (n) { return n; }, function (n) { return n; }, function (n) { return n; }));
// Generic tag with argument of generic function type
function someGenerics8(strs, n) { return n; }
var x = (_a_21 = ["", ""], _a_21.raw = ["", ""], someGenerics8(_a_21, someGenerics7));
(_a_22 = ["", "", "", ""], _a_22.raw = ["", "", "", ""], x(_a_22, null, null, null));
// Generic tag with multiple parameters of generic type passed arguments with no best common type
function someGenerics9(strs, a, b, c) {
    return null;
}
var a9a = (_a_23 = ["", "", "", ""], _a_23.raw = ["", "", "", ""], someGenerics9(_a_23, '', 0, []));
var a9a;
var a9e = (_a_24 = ["", "", "", ""], _a_24.raw = ["", "", "", ""], someGenerics9(_a_24, undefined, { x: 6, z: new Date() }, { x: 6, y: '' }));
var a9e;
// Generic tag with multiple parameters of generic type passed arguments with a single best common type
var a9d = (_a_25 = ["", "", "", ""], _a_25.raw = ["", "", "", ""], someGenerics9(_a_25, { x: 3 }, { x: 6 }, { x: 6 }));
var a9d;
// Generic tag with multiple parameters of generic type where one argument is of type 'any'
var anyVar;
var a = (_a_26 = ["", "", "", ""], _a_26.raw = ["", "", "", ""], someGenerics9(_a_26, 7, anyVar, 4));
var a;
// Generic tag with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = (_a_27 = ["", "", "", ""], _a_27.raw = ["", "", "", ""], someGenerics9(_a_27, [], null, undefined));
var arr;
var _a, _a_1, _a_2, _a_3, _a_4, _a_5, _a_6, _a_7, _a_8, _a_9, _a_10, _a_11, _a_12, _a_13, _a_14, _a_15, _a_16, _a_17, _a_18, _a_19, _a_20, _a_21, _a_22, _a_23, _a_24, _a_25, _a_26, _a_27;
