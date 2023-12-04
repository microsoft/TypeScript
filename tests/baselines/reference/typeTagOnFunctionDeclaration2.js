//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration2.ts] ////

//// [index.js]
export function test1() {}

/** @type {{(arg1: string): void;}} */
function setter1(arg1) {}

Object.defineProperty(test1, "foo", {
  set: setter1,
});

export function test2() {}

/** @type {{(arg1: string): void; bar: number}} */
function setter2(arg1) {}
setter2.bar = 10;

Object.defineProperty(test2, "foo", {
  set: setter2,
});


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test2 = exports.test1 = void 0;
function test1() { }
exports.test1 = test1;
/** @type {{(arg1: string): void;}} */
function setter1(arg1) { }
Object.defineProperty(test1, "foo", {
    set: setter1,
});
function test2() { }
exports.test2 = test2;
/** @type {{(arg1: string): void; bar: number}} */
function setter2(arg1) { }
setter2.bar = 10;
Object.defineProperty(test2, "foo", {
    set: setter2,
});


//// [index.d.ts]
export function test1(): void;
export namespace test1 {
    let foo: string;
}
export function test2(): void;
export namespace test2 {
    let foo_1: any;
    export { foo_1 as foo };
}
