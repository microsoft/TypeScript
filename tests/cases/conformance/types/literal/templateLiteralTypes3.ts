// @strict: true
// @declaration: true

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

function ff1(x: `foo-${string}`, y: `${string}-bar`, z: `baz-${string}`) {
    if (x === y) {
        x;  // `foo-${string}`
    }
    if (x === z) {  // Error
    }
}

function ff2<T extends string>(x: `foo-${T}`, y: `${T}-bar`, z: `baz-${T}`) {
    if (x === y) {
        x;  // `foo-${T}`
    }
    if (x === z) {  // Error
    }
}

function ff3(x: string, y: `foo-${string}` | 'bar') {
    if (x === y) {
        x;  // `foo-${string}` | 'bar'
    }
}

function ff4(x: string, y: `foo-${string}`) {
    if (x === 'foo-test') {
        x;  // 'foo-test'
    }
    if (y === 'foo-test') {
        y;  // 'foo-test'
    }
}

// Repro from #46045

type Action =
    | { type: `${string}_REQUEST` }
    | { type: `${string}_SUCCESS`, response: string };

function reducer(action: Action) {
    if (action.type === 'FOO_SUCCESS') {
        action.type;
        action.response;
    }
}

// Repro from #46768

type DotString = `${string}.${string}.${string}`;

declare function noSpread<P extends DotString>(args: P[]): P;
declare function spread<P extends DotString>(...args: P[]): P;

noSpread([`1.${'2'}.3`, `1.${'2'}.4`]);
noSpread([`1.${'2' as string}.3`, `1.${'2' as string}.4`]);

spread(`1.${'2'}.3`, `1.${'2'}.4`);
spread(`1.${'2' as string}.3`, `1.${'2' as string}.4`);

function ft1<T extends string>(t: T, u: Uppercase<T>, u1: Uppercase<`1.${T}.3`>, u2: Uppercase<`1.${T}.4`>) {
    spread(`1.${t}.3`, `1.${t}.4`);
    spread(`1.${u}.3`, `1.${u}.4`);
    spread(u1, u2);
}

// Repro from #52685

type Boom = 'abc' | 'def' | `a${string}` | Lowercase<string>;

// Repro from #56582

function a<T extends {id: string}>() {
    let x: keyof T & string | `-${keyof T & string}`;
    x = "id";
    x = "-id";
}
