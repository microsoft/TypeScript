//// [templateLiteralTypes1.ts]
// Template types example from #12754

const createScopedActionType = <S extends string>(scope: S) => <T extends string>(type: T) => `${scope}/${type}` as `${S}/${T}`;
const createActionInMyScope = createScopedActionType("MyScope");  // <T extends string>(type: T) => `MyScope/${T}`
const MY_ACTION = createActionInMyScope("MY_ACTION");  // 'MyScope/MY_ACTION'

// Union types are distributed over template types

type EventName<S extends string> = `${S}Changed`;
type EN1 = EventName<'Foo' | 'Bar' | 'Baz'>;
type Loc = `${'top' | 'middle' | 'bottom'}-${'left' | 'center' | 'right'}`;

// Primitive literal types can be spread into templates

type ToString<T extends string | number | boolean | bigint> = `${T}`;
type TS1 = ToString<'abc' | 42 | true | -1234n>;

// Nested template literal type normalization

type TL1<T extends string> = `a${T}b${T}c`;
type TL2<U extends string> = TL1<`x${U}y`>;  // `ax${U}ybx{$U}yc`
type TL3 = TL2<'o'>;  // 'axoybxoyc'

// Casing intrinsics

type Cases<T extends string> = `${Uppercase<T>} ${Lowercase<T>} ${Capitalize<T>} ${Uncapitalize<T>}`;

type TCA1 = Cases<'bar'>;  // 'BAR bar Bar bar'
type TCA2 = Cases<'BAR'>;  // 'BAR bar BAR bAR'

// Assignability

function test<T extends 'foo' | 'bar'>(name: `get${Capitalize<T>}`) {
    let s1: string = name;
    let s2: 'getFoo' | 'getBar' = name;
}

function fa1<T>(x: T, y: { [P in keyof T]: T[P] }, z: { [P in keyof T & string as `p_${P}`]: T[P] }) {
    y = x;
    z = x;  // Error
}

function fa2<T, U extends T, A extends string, B extends A>(x: { [P in B as `p_${P}`]: T }, y: { [Q in A as `p_${Q}`]: U }) {
    x = y;
    y = x;  // Error
}

// String transformations using recursive conditional types

type Join<T extends unknown[], D extends string> =
    T extends [] ? '' :
    T extends [string | number | boolean | bigint] ? `${T[0]}` :
    T extends [string | number | boolean | bigint, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
    string;

type TJ1 = Join<[1, 2, 3, 4], '.'>
type TJ2 = Join<['foo', 'bar', 'baz'], '-'>;
type TJ3 = Join<[], '.'>

// Inference based on delimiters

type MatchPair<S extends string> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown;

type T20 = MatchPair<'[1,2]'>;  // ['1', '2']
type T21 = MatchPair<'[foo,bar]'>;  // ['foo', 'bar']
type T22 = MatchPair<' [1,2]'>;  // unknown
type T23 = MatchPair<'[123]'>;  // unknown
type T24 = MatchPair<'[1,2,3,4]'>;  // ['1', '2,3,4']

type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Lowercase<T>}` :
    SnakeToPascalCase<S>;

type SnakeToPascalCase<S extends string> =
    string extends S ? string :
    S extends `${infer T}_${infer U}` ? `${Capitalize<Lowercase<T>>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Capitalize<Lowercase<T>>}` :
    never;

type RR0 = SnakeToPascalCase<'hello_world_foo'>;  // 'HelloWorldFoo'
type RR1 = SnakeToPascalCase<'FOO_BAR_BAZ'>;  // 'FooBarBaz'
type RR2 = SnakeToCamelCase<'hello_world_foo'>;  // 'helloWorldFoo'
type RR3 = SnakeToCamelCase<'FOO_BAR_BAZ'>;  // 'fooBarBaz'

// Single character inference

type FirstTwoAndRest<S extends string> = S extends `${infer A}${infer B}${infer R}` ? [`${A}${B}`, R] : unknown;

type T25 = FirstTwoAndRest<'abcde'>;  // ['ab', 'cde']
type T26 = FirstTwoAndRest<'ab'>;  // ['ab', '']
type T27 = FirstTwoAndRest<'a'>;  // unknown

type HexDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' |'8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

type HexColor<S extends string> =
    S extends `#${infer R1}${infer R2}${infer G1}${infer G2}${infer B1}${infer B2}` ?
        [R1, R2, G1, G2, B1, B2] extends [HexDigit, HexDigit, HexDigit, HexDigit, HexDigit, HexDigit] ?
            S :
            never :
        never;

type TH1 = HexColor<'#8080FF'>;  // '#8080FF'
type TH2 = HexColor<'#80c0ff'>;  // '#80c0ff'
type TH3 = HexColor<'#8080F'>;  // never
type TH4 = HexColor<'#8080FFF'>;  // never

// Recursive inference

type Trim<S extends string> =
    S extends ` ${infer T}` ? Trim<T> :
    S extends `${infer T} ` ? Trim<T> :
    S;

type TR1 = Trim<'xx   '>;  // 'xx'
type TR2 = Trim<'   xx'>;  // 'xx'
type TR3 = Trim<'   xx   '>;  // 'xx'

type Split<S extends string, D extends string> =
    string extends S ? string[] :
    S extends '' ? [] :
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
    [S];

type T40 = Split<'foo', '.'>;  // ['foo']
type T41 = Split<'foo.bar.baz', '.'>;  // ['foo', 'bar', 'baz']
type T42 = Split<'foo.bar', ''>;  // ['f', 'o', 'o', '.', 'b', 'a', 'r']
type T43 = Split<any, '.'>;  // string[]

// Inference and property name paths

declare function getProp<T, P0 extends keyof T & string, P1 extends keyof T[P0] & string, P2 extends keyof T[P0][P1] & string>(obj: T, path: `${P0}.${P1}.${P2}`): T[P0][P1][P2];
declare function getProp<T, P0 extends keyof T & string, P1 extends keyof T[P0] & string>(obj: T, path: `${P0}.${P1}`): T[P0][P1];
declare function getProp<T, P0 extends keyof T & string>(obj: T, path: P0): T[P0];
declare function getProp(obj: object, path: string): unknown;

let p1 = getProp({ a: { b: {c: 42, d: 'hello' }}} as const, 'a');
let p2 = getProp({ a: { b: {c: 42, d: 'hello' }}} as const, 'a.b');
let p3 = getProp({ a: { b: {c: 42, d: 'hello' }}} as const, 'a.b.d');

type PropType<T, Path extends string> =
    string extends Path ? unknown :
    Path extends keyof T ? T[Path] :
    Path extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown :
    unknown;

declare function getPropValue<T, P extends string>(obj: T, path: P): PropType<T, P>;
declare const s: string;

const obj = { a: { b: {c: 42, d: 'hello' }}};

getPropValue(obj, 'a');  // { b: {c: number, d: string } }
getPropValue(obj, 'a.b');  // {c: number, d: string }
getPropValue(obj, 'a.b.d');  // string
getPropValue(obj, 'a.b.x');  // unknown
getPropValue(obj, s);  // unknown

// Infer type variables in template literals have string constraint

type S1<T> = T extends `foo${infer U}bar` ? S2<U> : never;
type S2<S extends string> = S;

// Check that infer T declarations are validated

type TV1 = `${infer X}`;

// Batched single character inferences for lower recursion depth

type Chars<S extends string> =
    string extends S ? string[] :
    S extends `${infer C0}${infer C1}${infer C2}${infer C3}${infer C4}${infer C5}${infer C6}${infer C7}${infer C8}${infer C9}${infer R}` ? [C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, ...Chars<R>] :
    S extends `${infer C}${infer R}` ? [C, ...Chars<R>] :
    S extends '' ? [] :
    never;

type L1 = Chars<'FooBarBazThisIsALongerString'>;  // ['F', 'o', 'o', 'B', 'a', 'r', ...]

// Infer never when source isn't a literal type that matches the pattern

type Foo<T> = T extends `*${infer S}*` ? S : never;

type TF1 = Foo<any>;      // never
type TF2 = Foo<string>;   // never
type TF3 = Foo<'abc'>;    // never
type TF4 = Foo<'*abc*'>;  // 'abc'

// Cross product unions limited to 100,000 constituents

type A = any;

type U1 = {a1:A} | {b1:A} | {c1:A} | {d1:A} | {e1:A} | {f1:A} | {g1:A} | {h1:A} | {i1:A} | {j1:A};
type U2 = {a2:A} | {b2:A} | {c2:A} | {d2:A} | {e2:A} | {f2:A} | {g2:A} | {h2:A} | {i2:A} | {j2:A};
type U3 = {a3:A} | {b3:A} | {c3:A} | {d3:A} | {e3:A} | {f3:A} | {g3:A} | {h3:A} | {i3:A} | {j3:A};
type U4 = {a4:A} | {b4:A} | {c4:A} | {d4:A} | {e4:A} | {f4:A} | {g4:A} | {h4:A} | {i4:A} | {j4:A};
type U5 = {a5:A} | {b5:A} | {c5:A} | {d5:A} | {e5:A} | {f5:A} | {g5:A} | {h5:A} | {i5:A} | {j5:A};

type U100000 = U1 & U2 & U3 & U4 & U5;  // Error

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type D100000 = `${Digits}${Digits}${Digits}${Digits}${Digits}`;  // Error

type TDigits = [0] | [1] | [2] | [3] | [4] | [5] | [6] | [7] | [8] | [9];

type T100000 = [...TDigits, ...TDigits, ...TDigits, ...TDigits, ...TDigits];  // Error

// Repro from #40863

type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false;

type AA<T extends number, Q extends number> =
    [true, true] extends [IsNegative<T>, IsNegative<Q>] ? 'Every thing is ok!' : ['strange', IsNegative<T>, IsNegative<Q>];

type BB = AA<-2, -2>;

// Repro from #40970

type PathKeys<T> =
    T extends readonly any[] ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>> :
    T extends object ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>> :
    never;

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never;

declare function getProp2<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>;

const obj2 = {
    name: 'John',
    age: 42,
    cars: [
        { make: 'Ford', age: 10 },
        { make: 'Trabant', age: 35 }
    ]
} as const;

let make = getProp2(obj2, 'cars.1.make');  // 'Trabant'

// Repro from #46480

export type Spacing =
    | `0`
    | `${number}px`
    | `${number}rem`
    | `s${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`;

const spacing: Spacing = "s12"

export type SpacingShorthand =
    | `${Spacing} ${Spacing}`
    | `${Spacing} ${Spacing} ${Spacing}`
    | `${Spacing} ${Spacing} ${Spacing} ${Spacing}`;

const test1: SpacingShorthand = "0 0 0";


//// [templateLiteralTypes1.js]
"use strict";
// Template types example from #12754
exports.__esModule = true;
var createScopedActionType = function (scope) { return function (type) { return "".concat(scope, "/").concat(type); }; };
var createActionInMyScope = createScopedActionType("MyScope"); // <T extends string>(type: T) => `MyScope/${T}`
var MY_ACTION = createActionInMyScope("MY_ACTION"); // 'MyScope/MY_ACTION'
// Assignability
function test(name) {
    var s1 = name;
    var s2 = name;
}
function fa1(x, y, z) {
    y = x;
    z = x; // Error
}
function fa2(x, y) {
    x = y;
    y = x; // Error
}
var p1 = getProp({ a: { b: { c: 42, d: 'hello' } } }, 'a');
var p2 = getProp({ a: { b: { c: 42, d: 'hello' } } }, 'a.b');
var p3 = getProp({ a: { b: { c: 42, d: 'hello' } } }, 'a.b.d');
var obj = { a: { b: { c: 42, d: 'hello' } } };
getPropValue(obj, 'a'); // { b: {c: number, d: string } }
getPropValue(obj, 'a.b'); // {c: number, d: string }
getPropValue(obj, 'a.b.d'); // string
getPropValue(obj, 'a.b.x'); // unknown
getPropValue(obj, s); // unknown
var obj2 = {
    name: 'John',
    age: 42,
    cars: [
        { make: 'Ford', age: 10 },
        { make: 'Trabant', age: 35 }
    ]
};
var make = getProp2(obj2, 'cars.1.make'); // 'Trabant'
var spacing = "s12";
var test1 = "0 0 0";


//// [templateLiteralTypes1.d.ts]
export declare type Spacing = `0` | `${number}px` | `${number}rem` | `s${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`;
export declare type SpacingShorthand = `${Spacing} ${Spacing}` | `${Spacing} ${Spacing} ${Spacing}` | `${Spacing} ${Spacing} ${Spacing} ${Spacing}`;
