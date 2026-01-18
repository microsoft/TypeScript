//// [tests/cases/conformance/expressions/functionCalls/typeArgumentInferenceConstructSignatures.ts] ////

//// [typeArgumentInferenceConstructSignatures.ts]
// Generic call with no parameters
interface NoParams {
    new <T>();
}
declare var noParams: NoParams;
new noParams();
new noParams<string>();
new noParams<{}>();

// Generic call with parameters but none use type parameter type
interface noGenericParams {
    new <T>(n: string);
}
declare var noGenericParams: noGenericParams;
new noGenericParams('');
new noGenericParams<number>('');
new noGenericParams<{}>('');

// Generic call with multiple type parameters and only one used in parameter type annotation
interface someGenerics1 {
    new <T, U>(n: T, m: number);
}
declare var someGenerics1: someGenerics1;
new someGenerics1(3, 4);
new someGenerics1<string, number>(3, 4); // Error
new someGenerics1<number, {}>(3, 4);

// Generic call with argument of function type whose parameter is of type parameter type
interface someGenerics2a {
    new <T>(n: (x: T) => void);
}
declare var someGenerics2a: someGenerics2a;
new someGenerics2a((n: string) => n);
new someGenerics2a<string>((n: string) => n);
new someGenerics2a<string>((n) => n.substr(0));

interface someGenerics2b {
    new <T, U>(n: (x: T, y: U) => void);
}
declare var someGenerics2b: someGenerics2b;
new someGenerics2b((n: string, x: number) => n);
new someGenerics2b<string, number>((n: string, t: number) => n);
new someGenerics2b<string, number>((n, t) => n.substr(t * t));

// Generic call with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
interface someGenerics3 {
    new <T>(producer: () => T);
}
declare var someGenerics3: someGenerics3;
new someGenerics3(() => '');
new someGenerics3<Window>(() => undefined);
new someGenerics3<number>(() => 3);

// 2 parameter generic call with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
interface someGenerics4 {
    new <T, U>(n: T, f: (x: U) => void);
}
declare var someGenerics4: someGenerics4;
new someGenerics4(4, () => null);
new someGenerics4<string, number>('', () => 3);
new someGenerics4<string, number>('', (x: string) => ''); // Error
new someGenerics4<string, number>(null, null);

// 2 parameter generic call with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
interface someGenerics5 {
    new <U, T>(n: T, f: (x: U) => void);
}
declare var someGenerics5: someGenerics5;
new someGenerics5(4, () => null);
new someGenerics5<number, string>('', () => 3);
new someGenerics5<number, string>('', (x: string) => ''); // Error
new someGenerics5<string, number>(null, null);

// Generic call with multiple arguments of function types that each have parameters of the same generic type
interface someGenerics6 {
    new <A>(a: (a: A) => A, b: (b: A) => A, c: (c: A) => A);
}
declare var someGenerics6: someGenerics6;
new someGenerics6(n => n, n => n, n => n);
new someGenerics6<number>(n => n, n => n, n => n);
new someGenerics6<number>((n: number) => n, (n: string) => n, (n: number) => n); // Error
new someGenerics6<number>((n: number) => n, (n: number) => n, (n: number) => n);

// Generic call with multiple arguments of function types that each have parameters of different generic type
interface someGenerics7 {
    new <A, B, C>(a: (a: A) => A, b: (b: B) => B, c: (c: C) => C);
}
declare var someGenerics7: someGenerics7;
new someGenerics7(n => n, n => n, n => n);
new someGenerics7<number, string, number>(n => n, n => n, n => n);
new someGenerics7<number, string, number>((n: number) => n, (n: string) => n, (n: number) => n);

// Generic call with argument of generic function type
interface someGenerics8 {
    new <T>(n: T): T;
}
declare var someGenerics8: someGenerics8;
var x = new someGenerics8(someGenerics7);
new x<string, string, string>(null, null, null);

// Generic call with multiple parameters of generic type passed arguments with no best common type
interface someGenerics9 {
    new <T>(a: T, b: T, c: T): T;
}
declare var someGenerics9: someGenerics9;
var a9a = new someGenerics9('', 0, []);
declare var a9a: {};
var a9b = new someGenerics9<{ a?: number; b?: string; }>({ a: 0 }, { b: '' }, null);
declare var a9b: { a?: number; b?: string; };

// Generic call with multiple parameters of generic type passed arguments with multiple best common types
interface A91 {
    x: number;
    y?: string;
}
interface A92 {
    x: number;
    z?: Window;
}
var a9e = new someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
declare var a9e: {};
var a9f = new someGenerics9<A92>(undefined, { x: 6, z: window }, { x: 6, y: '' });
declare var a9f: A92;

// Generic call with multiple parameters of generic type passed arguments with a single best common type
var a9d = new someGenerics9({ x: 3 }, { x: 6 }, { x: 6 });
declare var a9d: { x: number; };

// Generic call with multiple parameters of generic type where one argument is of type 'any'
declare var anyVar: any;
var a = new someGenerics9(7, anyVar, 4);
declare var a: any;

// Generic call with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = new someGenerics9([], null, undefined);
declare var arr: any[];



//// [typeArgumentInferenceConstructSignatures.js]
new noParams();
new noParams();
new noParams();
new noGenericParams('');
new noGenericParams('');
new noGenericParams('');
new someGenerics1(3, 4);
new someGenerics1(3, 4); // Error
new someGenerics1(3, 4);
new someGenerics2a(function (n) { return n; });
new someGenerics2a(function (n) { return n; });
new someGenerics2a(function (n) { return n.substr(0); });
new someGenerics2b(function (n, x) { return n; });
new someGenerics2b(function (n, t) { return n; });
new someGenerics2b(function (n, t) { return n.substr(t * t); });
new someGenerics3(function () { return ''; });
new someGenerics3(function () { return undefined; });
new someGenerics3(function () { return 3; });
new someGenerics4(4, function () { return null; });
new someGenerics4('', function () { return 3; });
new someGenerics4('', function (x) { return ''; }); // Error
new someGenerics4(null, null);
new someGenerics5(4, function () { return null; });
new someGenerics5('', function () { return 3; });
new someGenerics5('', function (x) { return ''; }); // Error
new someGenerics5(null, null);
new someGenerics6(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
new someGenerics6(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
new someGenerics6(function (n) { return n; }, function (n) { return n; }, function (n) { return n; }); // Error
new someGenerics6(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
new someGenerics7(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
new someGenerics7(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
new someGenerics7(function (n) { return n; }, function (n) { return n; }, function (n) { return n; });
var x = new someGenerics8(someGenerics7);
new x(null, null, null);
var a9a = new someGenerics9('', 0, []);
var a9b = new someGenerics9({ a: 0 }, { b: '' }, null);
var a9e = new someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9f = new someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
// Generic call with multiple parameters of generic type passed arguments with a single best common type
var a9d = new someGenerics9({ x: 3 }, { x: 6 }, { x: 6 });
var a = new someGenerics9(7, anyVar, 4);
// Generic call with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = new someGenerics9([], null, undefined);
