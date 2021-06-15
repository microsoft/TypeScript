//// [indexSignatures1.ts]
// Symbol index signature checking

const sym = Symbol();

function gg3(x: { [key: string]: string }, y: { [key: symbol]: string }, z: { [sym]: number }) {
    x = z;
    y = z;  // Error
}

// Overlapping index signatures

function gg1(x: { [key: `a${string}`]: string, [key: `${string}a`]: string }, y: { [key: `a${string}a`]: string }) {
    x = y;
    y = x;
}

interface IX { [key: `a${string}`]: string, [key: `${string}a`]: string }
interface IY { [key: `a${string}a`]: string }

function gg2(x: IX, y: IY) {
    x = y;  // Error
    y = x;
}

// Intersection of multiple applicable index signatures

declare let combo: { [x: `foo-${string}`]: 'a' | 'b' } & { [x: `${string}-bar`]: 'b' | 'c' };
const x1 = combo['foo-test'];  // 'a' | 'b'
const x2 = combo['test-bar'];  // 'b' | 'c'
const x3 = combo['foo-test-bar'];  // 'b' (('a' | 'b') & ('b' | 'c'))

declare var str: string;

const x4 = combo[`foo-${str}`];
const x5 = combo[`${str}-bar`];
const x6 = combo[`foo-${str}-bar`];

declare let combo2: { [x: `${string}xxx${string}` & `${string}yyy${string}`]: string };

const x7 = combo2['axxxbyyyc'];
const x8 = combo2['ayyyxxxbc'];
const x9 = combo2['axxxbbbyc'];  // Error

// Property access on template pattern index signature

declare let dom: { [x: `data${string}`]: string };
const y1 = dom['data123'];
const y2 = dom.data123;

// Excess property checking for template pattern index signature

dom = { data123: 'hello' };
dom = { date123: 'hello' };  // Error

// Contextual typing by index signature with template literal pattern

type Funcs = {
    [key: `s${string}`]: (x: string) => void,
    [key: `n${string}`]: (x: number) => void,
}

const funcs: Funcs = {
    sfoo: x => x.length,  // x: string
    nfoo: x => x * 2,     // n: number
}

// Duplicate index signature checking

type Duplicates = {
    [key: string | number]: any;  // Error
    [key: number | symbol]: any;  // Error
    [key: symbol | `foo${string}`]: any;  // Error
    [key: `foo${string}`]: any;  // Error
}

// Conflicting index signature checking

type Conflicting = {
    [key: `a${string}`]: 'a';
    [key: `${string}a`]: 'b';
    [key: `a${string}a`]: 'c';  // Error
}

// Invalid index signatures

type Invalid<T extends string> = {
    [key: 'a' | 'b' | 'c']: string;  // Error
    [key: T | number]: string;  // Error
    [key: Error]: string;  // Error
    [key: T & string]: string;  // Error
}

// Intersections in index signatures

type Tag1 = { __tag1__: void };
type Tag2 = { __tag2__: void };

type TaggedString1 = string & Tag1;
type TaggedString2 = string & Tag2;

declare let obj1: { [key: TaggedString1]: string };
declare let obj2: { [key: TaggedString2]: string };
declare let obj3: { [key: TaggedString1 | TaggedString2]: string };
declare let obj4: { [key: TaggedString1 & TaggedString2]: string };

declare let s0: string;
declare let s1: TaggedString1;
declare let s2: TaggedString2;
declare let s3: TaggedString1 | TaggedString2;
declare let s4: TaggedString1 & TaggedString2;

obj1[s0];  // Error
obj1[s1];
obj1[s2];  // Error
obj1[s3];  // Error
obj1[s4];

obj2[s0];  // Error
obj2[s1];
obj2[s2];
obj2[s3];  // Error
obj2[s4];

obj3[s0];  // Error
obj3[s1];
obj3[s2];
obj3[s3];
obj3[s4];

obj4[s0];  // Error
obj4[s1];  // Error
obj4[s2];  // Error
obj4[s3];  // Error
obj4[s4];

// Repros from #1863

const system = Symbol('system');
const SomeSytePlugin = Symbol('SomeSytePlugin');

interface Plugs {
    [key: symbol]: (...args: any) => unknown;
}

const plugins = {
    "user": {} as Plugs,
    [system]: {} as Plugs
};

plugins[system][SomeSytePlugin] = () => console.log('awsome');
plugins[system][SomeSytePlugin]();

var theAnswer: symbol = Symbol('secret');
var obj = {} as Record<symbol, number>;
obj[theAnswer] = 42;

// Repro from #26470

const directive = Symbol('directive');
declare function foo<TArg, TRet, TDir>(options: { [x in string]: (arg: TArg) => TRet } & { [directive]?: TDir }): void;

let case1 = foo({
    [directive]: (x: string) => 'str',
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
});

let case2 = foo({
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
    [directive]: (x: string) => 'str',
});

let case3 = foo({
    [directive]: 'str',
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
});

// Repros from #42192

type Pseudo = `&:${string}`;

const AmIPseudo1: Pseudo = '&:test';
const AmIPseudo: Pseudo = '&';  // Error

type PseudoDeclaration = { [key in Pseudo]: string };

const test: PseudoDeclaration = { 'someKey' : 'someValue' };  // Error

type FieldPattern = `/${string}`;

const path1: FieldPattern = '/one';
const path2: FieldPattern = 'two';  // Error

type PathsObject = { [P in FieldPattern]: object; };
const pathObject: PathsObject = 123;  // Error

type IdType = `${number}-${number}-${number}-${number}`
const id: IdType = '0000-0000-0000-0001';

type A = Record<IdType, string>;

const a: A = { [id]: 'test' }

let aid = a[id];


//// [indexSignatures1.js]
"use strict";
// Symbol index signature checking
const sym = Symbol();
function gg3(x, y, z) {
    x = z;
    y = z; // Error
}
// Overlapping index signatures
function gg1(x, y) {
    x = y;
    y = x;
}
function gg2(x, y) {
    x = y; // Error
    y = x;
}
const x1 = combo['foo-test']; // 'a' | 'b'
const x2 = combo['test-bar']; // 'b' | 'c'
const x3 = combo['foo-test-bar']; // 'b' (('a' | 'b') & ('b' | 'c'))
const x4 = combo[`foo-${str}`];
const x5 = combo[`${str}-bar`];
const x6 = combo[`foo-${str}-bar`];
const x7 = combo2['axxxbyyyc'];
const x8 = combo2['ayyyxxxbc'];
const x9 = combo2['axxxbbbyc']; // Error
const y1 = dom['data123'];
const y2 = dom.data123;
// Excess property checking for template pattern index signature
dom = { data123: 'hello' };
dom = { date123: 'hello' }; // Error
const funcs = {
    sfoo: x => x.length,
    nfoo: x => x * 2, // n: number
};
obj1[s0]; // Error
obj1[s1];
obj1[s2]; // Error
obj1[s3]; // Error
obj1[s4];
obj2[s0]; // Error
obj2[s1];
obj2[s2];
obj2[s3]; // Error
obj2[s4];
obj3[s0]; // Error
obj3[s1];
obj3[s2];
obj3[s3];
obj3[s4];
obj4[s0]; // Error
obj4[s1]; // Error
obj4[s2]; // Error
obj4[s3]; // Error
obj4[s4];
// Repros from #1863
const system = Symbol('system');
const SomeSytePlugin = Symbol('SomeSytePlugin');
const plugins = {
    "user": {},
    [system]: {}
};
plugins[system][SomeSytePlugin] = () => console.log('awsome');
plugins[system][SomeSytePlugin]();
var theAnswer = Symbol('secret');
var obj = {};
obj[theAnswer] = 42;
// Repro from #26470
const directive = Symbol('directive');
let case1 = foo({
    [directive]: (x) => 'str',
    addOne: (x) => x + 1,
    double: (x) => x + x,
});
let case2 = foo({
    addOne: (x) => x + 1,
    double: (x) => x + x,
    [directive]: (x) => 'str',
});
let case3 = foo({
    [directive]: 'str',
    addOne: (x) => x + 1,
    double: (x) => x + x,
});
const AmIPseudo1 = '&:test';
const AmIPseudo = '&'; // Error
const test = { 'someKey': 'someValue' }; // Error
const path1 = '/one';
const path2 = 'two'; // Error
const pathObject = 123; // Error
const id = '0000-0000-0000-0001';
const a = { [id]: 'test' };
let aid = a[id];


//// [indexSignatures1.d.ts]
declare const sym: unique symbol;
declare function gg3(x: {
    [key: string]: string;
}, y: {
    [key: symbol]: string;
}, z: {
    [sym]: number;
}): void;
declare function gg1(x: {
    [key: `a${string}`]: string;
    [key: `${string}a`]: string;
}, y: {
    [key: `a${string}a`]: string;
}): void;
interface IX {
    [key: `a${string}`]: string;
    [key: `${string}a`]: string;
}
interface IY {
    [key: `a${string}a`]: string;
}
declare function gg2(x: IX, y: IY): void;
declare let combo: {
    [x: `foo-${string}`]: 'a' | 'b';
} & {
    [x: `${string}-bar`]: 'b' | 'c';
};
declare const x1: "a" | "b";
declare const x2: "b" | "c";
declare const x3: "b";
declare var str: string;
declare const x4: "a" | "b";
declare const x5: "b" | "c";
declare const x6: "b";
declare let combo2: {
    [x: `${string}xxx${string}` & `${string}yyy${string}`]: string;
};
declare const x7: string;
declare const x8: string;
declare const x9: any;
declare let dom: {
    [x: `data${string}`]: string;
};
declare const y1: string;
declare const y2: string;
declare type Funcs = {
    [key: `s${string}`]: (x: string) => void;
    [key: `n${string}`]: (x: number) => void;
};
declare const funcs: Funcs;
declare type Duplicates = {
    [key: string | number]: any;
    [key: number | symbol]: any;
    [key: symbol | `foo${string}`]: any;
    [key: `foo${string}`]: any;
};
declare type Conflicting = {
    [key: `a${string}`]: 'a';
    [key: `${string}a`]: 'b';
    [key: `a${string}a`]: 'c';
};
declare type Invalid<T extends string> = {
    [key: 'a' | 'b' | 'c']: string;
    [key: T | number]: string;
    [key: Error]: string;
    [key: T & string]: string;
};
declare type Tag1 = {
    __tag1__: void;
};
declare type Tag2 = {
    __tag2__: void;
};
declare type TaggedString1 = string & Tag1;
declare type TaggedString2 = string & Tag2;
declare let obj1: {
    [key: TaggedString1]: string;
};
declare let obj2: {
    [key: TaggedString2]: string;
};
declare let obj3: {
    [key: TaggedString1 | TaggedString2]: string;
};
declare let obj4: {
    [key: TaggedString1 & TaggedString2]: string;
};
declare let s0: string;
declare let s1: TaggedString1;
declare let s2: TaggedString2;
declare let s3: TaggedString1 | TaggedString2;
declare let s4: TaggedString1 & TaggedString2;
declare const system: unique symbol;
declare const SomeSytePlugin: unique symbol;
interface Plugs {
    [key: symbol]: (...args: any) => unknown;
}
declare const plugins: {
    user: Plugs;
    [system]: Plugs;
};
declare var theAnswer: symbol;
declare var obj: Record<symbol, number>;
declare const directive: unique symbol;
declare function foo<TArg, TRet, TDir>(options: {
    [x in string]: (arg: TArg) => TRet;
} & {
    [directive]?: TDir;
}): void;
declare let case1: void;
declare let case2: void;
declare let case3: void;
declare type Pseudo = `&:${string}`;
declare const AmIPseudo1: Pseudo;
declare const AmIPseudo: Pseudo;
declare type PseudoDeclaration = {
    [key in Pseudo]: string;
};
declare const test: PseudoDeclaration;
declare type FieldPattern = `/${string}`;
declare const path1: FieldPattern;
declare const path2: FieldPattern;
declare type PathsObject = {
    [P in FieldPattern]: object;
};
declare const pathObject: PathsObject;
declare type IdType = `${number}-${number}-${number}-${number}`;
declare const id: IdType;
declare type A = Record<IdType, string>;
declare const a: A;
declare let aid: string;
