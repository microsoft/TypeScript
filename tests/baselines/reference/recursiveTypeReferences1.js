//// [tests/cases/conformance/types/typeRelationships/recursiveTypes/recursiveTypeReferences1.ts] ////

//// [recursiveTypeReferences1.ts]
type ValueOrArray<T> = T | Array<ValueOrArray<T>>;

const a0: ValueOrArray<number> = 1;
const a1: ValueOrArray<number> = [1, [2, 3], [4, [5, [6, 7]]]];

type HypertextNode = string | [string, { [key: string]: unknown }, ...HypertextNode[]];

const hypertextNode: HypertextNode =
    ["div", { id: "parent" },
        ["div", { id: "first-child" }, "I'm the first child"],
        ["div", { id: "second-child" }, "I'm the second child"]
    ];

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

let data: Json = {
    caption: "Test",
    location: { x: 10, y: 20 },
    values: [true, [10, 20], null]
};

interface Box<T> { value: T };

type T1 = Box<T1>;
type T2 = Box<Box<T2>>;
type T3 = Box<Box<Box<T3>>>;

function f1(t1: T1, t2: T2, t3: T3) {
    t1 = t2;
    t1 = t3;
    t2 = t1;
    t2 = t3;
    t3 = t1;
    t3 = t2;
}

type Box1 = Box<Box1> | number;

const b10: Box1 = 42;
const b11: Box1 = { value: 42 };
const b12: Box1 = { value: { value: { value: 42 }}};

type Box2 = Box<Box2 | number>;

const b20: Box2 = 42;  // Error
const b21: Box2 = { value: 42 };
const b22: Box2 = { value: { value: { value: 42 }}};

type RecArray<T> = Array<T | RecArray<T>>;

declare function flat<T>(a: RecArray<T>): Array<T>;
declare function flat1<T>(a: Array<T | Array<T>>): Array<T>
declare function flat2<T>(a: Array<T | Array<T | Array<T>>>): Array<T>;

flat([1, [2, [3]]]);  // number[]
flat([[[0]]]);  // number[]
flat([[[[[[[[[[[4]]]]]]]]]]]);  // number[]
flat([1, 'a', [2]]);  // (string | number)[]
flat([1, [2, 'a']]);  // (string | number)[]
flat([1, ['a']]);  // Error

flat1([1, [2, [3]]]);  // (number | number[])[]
flat1([[[0]]]);  // number[][]
flat1([1, 'a', [2]]);  // (string | number)[]
flat1([1, [2, 'a']]);  // (string | number)[]
flat1([1, ['a']]);  // Error

flat2([1, [2, [3]]]);  // number[]
flat2([[[0]]]);  // number[]
flat2([1, 'a', [2]]);  // (string | number)[]
flat2([1, [2, 'a']]);  // (string | number)[]
flat2([1, ['a']]);  // Error

type T10 = T10[];
type T11 = readonly T11[];
type T12 = (T12)[];
type T13 = T13[] | string;
type T14 = T14[] & { x: string };
type T15<X> = X extends string ? T15<X>[] : never;

type ValueOrArray1<T> = T | ValueOrArray1<T>[];
type ValueOrArray2<T> = T | ValueOrArray2<T>[];

declare function foo1<T>(a: ValueOrArray1<T>): T;
declare let ra1: ValueOrArray2<string>;

let x1 = foo1(ra1);  // Boom!

type NumberOrArray1<T> = T | ValueOrArray1<T>[];
type NumberOrArray2<T> = T | ValueOrArray2<T>[];

declare function foo2<T>(a: ValueOrArray1<T>): T;
declare let ra2: ValueOrArray2<string>;

let x2 = foo2(ra2);  // Boom!

// Repro from #33617 (errors are expected)

type Tree = [HTMLHeadingElement, Tree][];

function parse(node: Tree, index: number[] = []): HTMLUListElement {
  return html('ul', node.map(([el, children], i) => {
    const idx = [...index, i + 1];
    return html('li', [
      html('a', { href: `#${el.id}`, rel: 'noopener', 'data-index': idx.join('.') }, el.textContent!),
      children.length > 0 ? parse(children, idx) : frag()
    ]);
  }));
}

function cons(hs: HTMLHeadingElement[]): Tree {
  return hs
    .reduce<HTMLHeadingElement[][]>((hss, h) => {
      const hs = hss.pop()!;
      return hs.length === 0 || level(h) > level(hs[0])
        ? concat(hss, [concat(hs, [h])])
        : concat(hss, [hs, [h]]);
    }, [[]])
    .reduce<Tree>((node, hs) =>
      hs.length === 0
        ? node
        : concat<Tree[number]>(node, [[hs.shift()!, cons(hs)]])
    , []);
}

function level(h: HTMLHeadingElement): number {
  assert(isFinite(+h.tagName[1]));
  return +h.tagName[1];
}


//// [recursiveTypeReferences1.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var a0 = 1;
var a1 = [1, [2, 3], [4, [5, [6, 7]]]];
var hypertextNode = ["div", { id: "parent" },
    ["div", { id: "first-child" }, "I'm the first child"],
    ["div", { id: "second-child" }, "I'm the second child"]
];
var data = {
    caption: "Test",
    location: { x: 10, y: 20 },
    values: [true, [10, 20], null]
};
;
function f1(t1, t2, t3) {
    t1 = t2;
    t1 = t3;
    t2 = t1;
    t2 = t3;
    t3 = t1;
    t3 = t2;
}
var b10 = 42;
var b11 = { value: 42 };
var b12 = { value: { value: { value: 42 } } };
var b20 = 42; // Error
var b21 = { value: 42 };
var b22 = { value: { value: { value: 42 } } };
flat([1, [2, [3]]]); // number[]
flat([[[0]]]); // number[]
flat([[[[[[[[[[[4]]]]]]]]]]]); // number[]
flat([1, 'a', [2]]); // (string | number)[]
flat([1, [2, 'a']]); // (string | number)[]
flat([1, ['a']]); // Error
flat1([1, [2, [3]]]); // (number | number[])[]
flat1([[[0]]]); // number[][]
flat1([1, 'a', [2]]); // (string | number)[]
flat1([1, [2, 'a']]); // (string | number)[]
flat1([1, ['a']]); // Error
flat2([1, [2, [3]]]); // number[]
flat2([[[0]]]); // number[]
flat2([1, 'a', [2]]); // (string | number)[]
flat2([1, [2, 'a']]); // (string | number)[]
flat2([1, ['a']]); // Error
var x1 = foo1(ra1); // Boom!
var x2 = foo2(ra2); // Boom!
function parse(node, index) {
    if (index === void 0) { index = []; }
    return html('ul', node.map(function (_a, i) {
        var el = _a[0], children = _a[1];
        var idx = __spreadArray(__spreadArray([], index, true), [i + 1], false);
        return html('li', [
            html('a', { href: "#".concat(el.id), rel: 'noopener', 'data-index': idx.join('.') }, el.textContent),
            children.length > 0 ? parse(children, idx) : frag()
        ]);
    }));
}
function cons(hs) {
    return hs
        .reduce(function (hss, h) {
        var hs = hss.pop();
        return hs.length === 0 || level(h) > level(hs[0])
            ? concat(hss, [concat(hs, [h])])
            : concat(hss, [hs, [h]]);
    }, [[]])
        .reduce(function (node, hs) {
        return hs.length === 0
            ? node
            : concat(node, [[hs.shift(), cons(hs)]]);
    }, []);
}
function level(h) {
    assert(isFinite(+h.tagName[1]));
    return +h.tagName[1];
}


//// [recursiveTypeReferences1.d.ts]
type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
declare const a0: ValueOrArray<number>;
declare const a1: ValueOrArray<number>;
type HypertextNode = string | [string, {
    [key: string]: unknown;
}, ...HypertextNode[]];
declare const hypertextNode: HypertextNode;
type Json = string | number | boolean | null | Json[] | {
    [key: string]: Json;
};
declare let data: Json;
interface Box<T> {
    value: T;
}
type T1 = Box<T1>;
type T2 = Box<Box<T2>>;
type T3 = Box<Box<Box<T3>>>;
declare function f1(t1: T1, t2: T2, t3: T3): void;
type Box1 = Box<Box1> | number;
declare const b10: Box1;
declare const b11: Box1;
declare const b12: Box1;
type Box2 = Box<Box2 | number>;
declare const b20: Box2;
declare const b21: Box2;
declare const b22: Box2;
type RecArray<T> = Array<T | RecArray<T>>;
declare function flat<T>(a: RecArray<T>): Array<T>;
declare function flat1<T>(a: Array<T | Array<T>>): Array<T>;
declare function flat2<T>(a: Array<T | Array<T | Array<T>>>): Array<T>;
type T10 = T10[];
type T11 = readonly T11[];
type T12 = (T12)[];
type T13 = T13[] | string;
type T14 = T14[] & {
    x: string;
};
type T15<X> = X extends string ? T15<X>[] : never;
type ValueOrArray1<T> = T | ValueOrArray1<T>[];
type ValueOrArray2<T> = T | ValueOrArray2<T>[];
declare function foo1<T>(a: ValueOrArray1<T>): T;
declare let ra1: ValueOrArray2<string>;
declare let x1: string;
type NumberOrArray1<T> = T | ValueOrArray1<T>[];
type NumberOrArray2<T> = T | ValueOrArray2<T>[];
declare function foo2<T>(a: ValueOrArray1<T>): T;
declare let ra2: ValueOrArray2<string>;
declare let x2: string;
type Tree = [HTMLHeadingElement, Tree][];
declare function parse(node: Tree, index?: number[]): HTMLUListElement;
declare function cons(hs: HTMLHeadingElement[]): Tree;
declare function level(h: HTMLHeadingElement): number;
