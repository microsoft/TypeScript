//// [templateLiteralTypes3.ts]
// Inference from template literal type to template literal type

type Foo1<T> = T extends `*${infer U}*` ? U : never;

type T01 = Foo1<'hello'>;
type T02 = Foo1<'*hello*'>;
type T03 = Foo1<'**hello**'>;
type T04 = Foo1<`*${string}*`>;
type T05 = Foo1<`*${number}*`>;
type T06 = Foo1<`*${bigint}*`>;
type T07 = Foo1<`*${any}*`>;
type T08 = Foo1<`**${string}**`>;
type T09 = Foo1<`**${string}**${string}**`>;
type T10 = Foo1<`**${'a' | 'b' | 'c'}**`>;
type T11 = Foo1<`**${boolean}**${boolean}**`>;

declare function foo1<V extends string>(arg: `*${V}*`): V;

function f1<T extends string>(s: string, n: number, b: boolean, t: T) {
    let x1 = foo1('hello');  // Error
    let x2 = foo1('*hello*');
    let x3 = foo1('**hello**');
    let x4 = foo1(`*${s}*` as const);
    let x5 = foo1(`*${n}*` as const);
    let x6 = foo1(`*${b}*` as const);
    let x7 = foo1(`*${t}*` as const);
    let x8 = foo1(`**${s}**` as const);
}

// Inference to a placeholder immediately followed by another placeholder infers a single
// character or placeholder from the source.

type Parts<T> =
    T extends '' ? [] :
    T extends `${infer Head}${infer Tail}` ? [Head, ...Parts<Tail>] :
    never;

type T20 = Parts<`abc`>;
type T21 = Parts<`*${string}*`>;
type T22 = Parts<`*${number}*`>;
type T23 = Parts<`*${number}*${string}*${bigint}*`>;

function f2() {
    let x: `${number}.${number}.${number}`;
    x = '1.1.1';
    x = '1.1.1' as `1.1.${number}`;
    x = '1.1.1' as `1.${number}.1`;
    x = '1.1.1' as `1.${number}.${number}`;
    x = '1.1.1' as `${number}.1.1`;
    x = '1.1.1' as `${number}.1.${number}`;
    x = '1.1.1' as `${number}.${number}.1`;
    x = '1.1.1' as `${number}.${number}.${number}`;
}

function f3<T extends string>(s: string, n: number, b: boolean, t: T) {
    let x: `*${string}*`;
    x = 'hello';  // Error
    x = '*hello*';
    x = '**hello**';
    x = `*${s}*` as const;
    x = `*${n}*` as const;
    x = `*${b}*` as const;
    x = `*${t}*` as const;
    x = `**${s}**` as const;
}

function f4<T extends number>(s: string, n: number, b: boolean, t: T) {
    let x: `*${number}*`;
    x = '123';  // Error
    x = '*123*';
    x = '**123**';  // Error
    x = `*${s}*` as const;  // Error
    x = `*${n}*` as const;
    x = `*${b}*` as const;  // Error
    x = `*${t}*` as const;
}

// Repro from #43060

type A<T> = T extends `${infer U}.${infer V}` ? U | V : never
type B = A<`test.1024`>;  // "test" | "1024"
type C = A<`test.${number}`>;  // "test" | `${number}`

type D<T> = T extends `${infer U}.${number}` ? U : never
type E = D<`test.1024`>;  // "test"
type F = D<`test.${number}`>;  // "test"

type G<T> = T extends `${infer U}.${infer V}` ? U | V : never
type H = G<`test.hoge`>;  // "test" | "hoge"
type I = G<`test.${string}`>;  // string ("test" | string reduces to string)

type J<T> = T extends `${infer U}.${string}` ? U : never
type K = J<`test.hoge`>;  // "test"
type L = J<`test.${string}`>;  // "test""

// Repro from #43243

type Templated = `${string} ${string}`;

const value1: string = "abc";
const templated1: Templated = `${value1} abc` as const;
// Type '`${string} abc`' is not assignable to type '`${string} ${string}`'.

const value2 = "abc";
const templated2: Templated = `${value2} abc` as const;

// Repro from #43620

type Prefixes = "foo" | "bar";

type AllPrefixData = "foo:baz" | "bar:baz";

type PrefixData<P extends Prefixes> = `${P}:baz`;

interface ITest<P extends Prefixes, E extends AllPrefixData = PrefixData<P>> {
    blah: string;
}

// Repro from #45906

type Schema = { a: { b: { c: number } } };

declare function chain<F extends keyof Schema>(field: F | `${F}.${F}`): void;

chain("a");

// Repro from #46125

function ff1<T extends string>(x: `foo-${string}`, y: `${string}-bar`, z: `baz-${string}`) {
    if (x === y) {
        x;  // `foo-${string}`
    }
    if (x === z) {  // Error
    }
}

function ff2(x: string, y: `foo-${string}` | 'bar') {
    if (x === y) {
        x;  // `foo-${string}` | 'bar'
    }
}

function ff3(x: string, y: `foo-${string}`) {
    if (x === 'foo-test') {
        x;  // 'foo-test'
    }
    if (y === 'foo-test') {
        y;  // 'foo-test'
    }
}

// Repro from #46045

export type Action =
    | { type: `${string}_REQUEST` }
    | { type: `${string}_SUCCESS`, response: string };

export function reducer(action: Action) {
    if (action.type === 'FOO_SUCCESS') {
        action.type;
        action.response;
    }
}


//// [templateLiteralTypes3.js]
"use strict";
// Inference from template literal type to template literal type
exports.__esModule = true;
exports.reducer = void 0;
function f1(s, n, b, t) {
    var x1 = foo1('hello'); // Error
    var x2 = foo1('*hello*');
    var x3 = foo1('**hello**');
    var x4 = foo1("*" + s + "*");
    var x5 = foo1("*" + n + "*");
    var x6 = foo1("*" + b + "*");
    var x7 = foo1("*" + t + "*");
    var x8 = foo1("**" + s + "**");
}
function f2() {
    var x;
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
    x = '1.1.1';
}
function f3(s, n, b, t) {
    var x;
    x = 'hello'; // Error
    x = '*hello*';
    x = '**hello**';
    x = "*" + s + "*";
    x = "*" + n + "*";
    x = "*" + b + "*";
    x = "*" + t + "*";
    x = "**" + s + "**";
}
function f4(s, n, b, t) {
    var x;
    x = '123'; // Error
    x = '*123*';
    x = '**123**'; // Error
    x = "*" + s + "*"; // Error
    x = "*" + n + "*";
    x = "*" + b + "*"; // Error
    x = "*" + t + "*";
}
var value1 = "abc";
var templated1 = value1 + " abc";
// Type '`${string} abc`' is not assignable to type '`${string} ${string}`'.
var value2 = "abc";
var templated2 = value2 + " abc";
chain("a");
// Repro from #46125
function ff1(x, y, z) {
    if (x === y) {
        x; // `foo-${string}`
    }
    if (x === z) { // Error
    }
}
function ff2(x, y) {
    if (x === y) {
        x; // `foo-${string}` | 'bar'
    }
}
function ff3(x, y) {
    if (x === 'foo-test') {
        x; // 'foo-test'
    }
    if (y === 'foo-test') {
        y; // 'foo-test'
    }
}
function reducer(action) {
    if (action.type === 'FOO_SUCCESS') {
        action.type;
        action.response;
    }
}
exports.reducer = reducer;


//// [templateLiteralTypes3.d.ts]
export declare type Action = {
    type: `${string}_REQUEST`;
} | {
    type: `${string}_SUCCESS`;
    response: string;
};
export declare function reducer(action: Action): void;
