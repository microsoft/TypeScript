//// [tests/cases/conformance/types/members/indexSignatures1.ts] ////

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

declare let s0: string;
declare let s1: TaggedString1;
declare let s2: TaggedString2;
declare let s3: TaggedString1 | TaggedString2;
declare let s4: TaggedString1 & TaggedString2;

interface I1 { [key: TaggedString1]: string }
interface I2 { [key: TaggedString2]: string }
interface I3 { [key: TaggedString1 | TaggedString2]: string }
interface I4 { [key: TaggedString1 & TaggedString2]: string }

declare let i1: I1;
declare let i2: I2;
declare let i3: I3;
declare let i4: I4;

i1[s0];  // Error
i1[s1];
i1[s2];  // Error
i1[s3];  // Error
i1[s4];

i2[s0];  // Error
i2[s1];  // Error
i2[s2];
i2[s3];  // Error
i2[s4];

i3[s0];  // Error
i3[s1];
i3[s2];
i3[s3];
i3[s4];

i4[s0];  // Error
i4[s1];  // Error
i4[s2];  // Error
i4[s3];  // Error
i4[s4];

i1 = i2;  // Error
i1 = i3;
i1 = i4;  // Error

i2 = i1;  // Error
i2 = i3;
i2 = i4;  // Error

i3 = i1;  // Error
i3 = i2;  // Error
i3 = i4;  // Error

i4 = i1;
i4 = i2;
i4 = i3;

declare let o1: { [key: TaggedString1]: string };
declare let o2: { [key: TaggedString2]: string };
declare let o3: { [key: TaggedString1 | TaggedString2]: string };
declare let o4: { [key: TaggedString1 & TaggedString2]: string };

o1[s0];  // Error
o1[s1];
o1[s2];  // Error
o1[s3];  // Error
o1[s4];

o2[s0];  // Error
o2[s1];  // Error
o2[s2];
o2[s3];  // Error
o2[s4];

o3[s0];  // Error
o3[s1];
o3[s2];
o3[s3];
o3[s4];

o4[s0];  // Error
o4[s1];  // Error
o4[s2];  // Error
o4[s3];  // Error
o4[s4];

o1 = o2;
o1 = o3;
o1 = o4;

o2 = o1;
o2 = o3;
o2 = o4;

o3 = o1;
o3 = o2;
o3 = o4;

o4 = o1;
o4 = o2;
o4 = o3;

// Index signatures inferred from computed property names

const obj10 = {
    ['x']: 0 as const,
    ['a' + 'b']: 1 as const,
};

const obj11 = {
    [1]: 2 as const,
    [1 + 2]: 3 as const,
};

const obj12 = {
    [sym]: 4 as const,
    [Symbol()]: 5 as const,
};

const obj13 = {
    ['x']: 0 as const,
    ['a' + 'b']: 1 as const,
    [1]: 2 as const,
    [1 + 2]: 3 as const,
    [sym]: 4 as const,
    [Symbol()]: 5 as const,
};

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

// Repro from #44793

interface AA {
    a?: string;
    b?: number;
    [key: symbol]: string;
}

const aa: AA = { [sym]: '123' };

const obj1: { [key: symbol]: string } = { [sym]: 'hello '};
const obj2: { [key: string]: string } = { [sym]: 'hello '};  // Permitted for backwards compatibility
const obj3: { [key: number]: string } = { [sym]: 'hello '};  // Error

// Repro from #45772

type Id = string & { __tag: 'id '};
type Rec1 = { [key: Id]: number };
type Rec2 = Record<Id, number>;

type K1 = keyof Rec1;  // Id
type K2 = keyof Rec2;  // Id


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
    sfoo: x => x.length, // x: string
    nfoo: x => x * 2, // n: number
};
i1[s0]; // Error
i1[s1];
i1[s2]; // Error
i1[s3]; // Error
i1[s4];
i2[s0]; // Error
i2[s1]; // Error
i2[s2];
i2[s3]; // Error
i2[s4];
i3[s0]; // Error
i3[s1];
i3[s2];
i3[s3];
i3[s4];
i4[s0]; // Error
i4[s1]; // Error
i4[s2]; // Error
i4[s3]; // Error
i4[s4];
i1 = i2; // Error
i1 = i3;
i1 = i4; // Error
i2 = i1; // Error
i2 = i3;
i2 = i4; // Error
i3 = i1; // Error
i3 = i2; // Error
i3 = i4; // Error
i4 = i1;
i4 = i2;
i4 = i3;
o1[s0]; // Error
o1[s1];
o1[s2]; // Error
o1[s3]; // Error
o1[s4];
o2[s0]; // Error
o2[s1]; // Error
o2[s2];
o2[s3]; // Error
o2[s4];
o3[s0]; // Error
o3[s1];
o3[s2];
o3[s3];
o3[s4];
o4[s0]; // Error
o4[s1]; // Error
o4[s2]; // Error
o4[s3]; // Error
o4[s4];
o1 = o2;
o1 = o3;
o1 = o4;
o2 = o1;
o2 = o3;
o2 = o4;
o3 = o1;
o3 = o2;
o3 = o4;
o4 = o1;
o4 = o2;
o4 = o3;
// Index signatures inferred from computed property names
const obj10 = {
    ['x']: 0,
    ['a' + 'b']: 1,
};
const obj11 = {
    [1]: 2,
    [1 + 2]: 3,
};
const obj12 = {
    [sym]: 4,
    [Symbol()]: 5,
};
const obj13 = {
    ['x']: 0,
    ['a' + 'b']: 1,
    [1]: 2,
    [1 + 2]: 3,
    [sym]: 4,
    [Symbol()]: 5,
};
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
const aa = { [sym]: '123' };
const obj1 = { [sym]: 'hello ' };
const obj2 = { [sym]: 'hello ' }; // Permitted for backwards compatibility
const obj3 = { [sym]: 'hello ' }; // Error


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
type Funcs = {
    [key: `s${string}`]: (x: string) => void;
    [key: `n${string}`]: (x: number) => void;
};
declare const funcs: Funcs;
type Duplicates = {
    [key: string | number]: any;
    [key: number | symbol]: any;
    [key: symbol | `foo${string}`]: any;
    [key: `foo${string}`]: any;
};
type Conflicting = {
    [key: `a${string}`]: 'a';
    [key: `${string}a`]: 'b';
    [key: `a${string}a`]: 'c';
};
type Invalid<T extends string> = {
    [key: 'a' | 'b' | 'c']: string;
    [key: T | number]: string;
    [key: Error]: string;
    [key: T & string]: string;
};
type Tag1 = {
    __tag1__: void;
};
type Tag2 = {
    __tag2__: void;
};
type TaggedString1 = string & Tag1;
type TaggedString2 = string & Tag2;
declare let s0: string;
declare let s1: TaggedString1;
declare let s2: TaggedString2;
declare let s3: TaggedString1 | TaggedString2;
declare let s4: TaggedString1 & TaggedString2;
interface I1 {
    [key: TaggedString1]: string;
}
interface I2 {
    [key: TaggedString2]: string;
}
interface I3 {
    [key: TaggedString1 | TaggedString2]: string;
}
interface I4 {
    [key: TaggedString1 & TaggedString2]: string;
}
declare let i1: I1;
declare let i2: I2;
declare let i3: I3;
declare let i4: I4;
declare let o1: {
    [key: TaggedString1]: string;
};
declare let o2: {
    [key: TaggedString2]: string;
};
declare let o3: {
    [key: TaggedString1 | TaggedString2]: string;
};
declare let o4: {
    [key: TaggedString1 & TaggedString2]: string;
};
declare const obj10: {
    [x: string]: 0 | 1;
    x: 0;
};
declare const obj11: {
    [x: number]: 2 | 3;
    1: 2;
};
declare const obj12: {
    [x: symbol]: 4 | 5;
    [sym]: 4;
};
declare const obj13: {
    [x: string]: 0 | 2 | 1 | 3;
    [x: number]: 2 | 3;
    [x: symbol]: 4 | 5;
    x: 0;
    1: 2;
    [sym]: 4;
};
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
type Pseudo = `&:${string}`;
declare const AmIPseudo1: Pseudo;
declare const AmIPseudo: Pseudo;
type PseudoDeclaration = {
    [key in Pseudo]: string;
};
declare const test: PseudoDeclaration;
type FieldPattern = `/${string}`;
declare const path1: FieldPattern;
declare const path2: FieldPattern;
type PathsObject = {
    [P in FieldPattern]: object;
};
declare const pathObject: PathsObject;
type IdType = `${number}-${number}-${number}-${number}`;
declare const id: IdType;
type A = Record<IdType, string>;
declare const a: A;
declare let aid: string;
interface AA {
    a?: string;
    b?: number;
    [key: symbol]: string;
}
declare const aa: AA;
declare const obj1: {
    [key: symbol]: string;
};
declare const obj2: {
    [key: string]: string;
};
declare const obj3: {
    [key: number]: string;
};
type Id = string & {
    __tag: 'id ';
};
type Rec1 = {
    [key: Id]: number;
};
type Rec2 = Record<Id, number>;
type K1 = keyof Rec1;
type K2 = keyof Rec2;


!!!! File indexSignatures1.d.ts differs from original emit in noCheck emit
//// [indexSignatures1.d.ts]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -118,9 +118,9 @@
     [x: symbol]: 4 | 5;
     [sym]: 4;
 };
 declare const obj13: {
-    [x: string]: 0 | 2 | 1 | 3;
+    [x: string]: 0 | 1 | 2 | 3;
     [x: number]: 2 | 3;
     [x: symbol]: 4 | 5;
     x: 0;
     1: 2;
