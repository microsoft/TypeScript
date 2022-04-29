// Generic call with no parameters
function noParams<T extends {}>() { }
noParams();
noParams<string>();
noParams<{}>();

// Generic call with parameters but none use type parameter type
function noGenericParams<T extends number>(n: string) { }
noGenericParams(''); // Valid
noGenericParams<number>('');
noGenericParams<{}>(''); // Error

// Generic call with multiple type parameters and only one used in parameter type annotation
function someGenerics1<T, U extends T>(n: T, m: number) { }
someGenerics1(3, 4); // Valid
someGenerics1<string, number>(3, 4); // Error
someGenerics1<number, {}>(3, 4); // Error
someGenerics1<number, number>(3, 4);

// Generic call with argument of function type whose parameter is of type parameter type
function someGenerics2a<T extends string>(n: (x: T) => void) { }
someGenerics2a((n: string) => n);
someGenerics2a<string>((n: string) => n);
someGenerics2a<string>((n) => n.substr(0));

function someGenerics2b<T extends string, U extends number>(n: (x: T, y: U) => void) { }
someGenerics2b((n: string, x: number) => n);
someGenerics2b<string, number>((n: string, t: number) => n);
someGenerics2b<string, number>((n, t) => n.substr(t * t));

// Generic call with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3<T extends Window>(producer: () => T) { }
someGenerics3(() => ''); // Error
someGenerics3<Window>(() => undefined);
someGenerics3<number>(() => 3); // Error

// 2 parameter generic call with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4<T, U extends number>(n: T, f: (x: U) => void) { }
someGenerics4(4, () => null); // Valid
someGenerics4<string, number>('', () => 3);
someGenerics4<string, number>('', (x: string) => ''); // Error
someGenerics4<string, number>(null, null);

// 2 parameter generic call with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5<U extends number, T>(n: T, f: (x: U) => void) { }
someGenerics5(4, () => null); // Valid
someGenerics5<number, string>('', () => 3);
someGenerics5<number, string>('', (x: string) => ''); // Error
someGenerics5<string, number>(null, null); // Error

// Generic call with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6<A extends number>(a: (a: A) => A, b: (b: A) => A, c: (c: A) => A) { }
someGenerics6(n => n, n => n, n => n); // Valid
someGenerics6<number>(n => n, n => n, n => n);
someGenerics6<number>((n: number) => n, (n: string) => n, (n: number) => n); // Error
someGenerics6<number>((n: number) => n, (n: number) => n, (n: number) => n);

// Generic call with multiple arguments of function types that each have parameters of different generic type
function someGenerics7<A, B extends string, C>(a: (a: A) => A, b: (b: B) => B, c: (c: C) => C) { }
someGenerics7(n => n, n => n, n => n); // Valid, types of n are <any, string, any> respectively
someGenerics7<number, string, number>(n => n, n => n, n => n);
someGenerics7<number, string, number>((n: number) => n, (n: string) => n, (n: number) => n);

// Generic call with argument of generic function type
function someGenerics8<T extends string>(n: T): T { return n; }
var x = someGenerics8<string>(someGenerics7); // Error
x<string, string, string>(null, null, null); // Error

// Generic call with multiple parameters of generic type passed arguments with no best common type
function someGenerics9<T extends any>(a: T, b: T, c: T): T {
    return null;
}
var a9a = someGenerics9('', 0, []);
var a9a: {};
var a9b = someGenerics9<{ a?: number; b?: string; }>({ a: 0 }, { b: '' }, null);
var a9b: { a?: number; b?: string; };

// Generic call with multiple parameters of generic type passed arguments with multiple best common types
interface A91 {
    x: number;
    y?: string;
}
interface A92 {
    x: number;
    z?: Window;
}
var a9e = someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9e: {};
var a9f = someGenerics9<A92>(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9f: A92;

// Generic call with multiple parameters of generic type passed arguments with a single best common type
var a9d = someGenerics9({ x: 3 }, { x: 6 }, { x: 6 });
var a9d: { x: number; };

// Generic call with multiple parameters of generic type where one argument is of type 'any'
var anyVar: any;
var a = someGenerics9(7, anyVar, 4);
var a: any;

// Generic call with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = someGenerics9([], null, undefined);
var arr: any[];

