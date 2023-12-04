//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration3.ts] ////

//// [index.js]
export function test1() {}

/** @type {{(): string;}} */
function getter1() {
  return "";
}

Object.defineProperty(test1, "foo", {
  get: getter1,
});

export function test2() {}

/** @type {{(): string; bar: number}} */
function getter2() {
  return "";
}
getter2.bar = 10;

Object.defineProperty(test2, "foo", {
  get: getter2,
});


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test2 = exports.test1 = void 0;
function test1() { }
exports.test1 = test1;
/** @type {{(): string;}} */
function getter1() {
    return "";
}
Object.defineProperty(test1, "foo", {
    get: getter1,
});
function test2() { }
exports.test2 = test2;
/** @type {{(): string; bar: number}} */
function getter2() {
    return "";
}
getter2.bar = 10;
Object.defineProperty(test2, "foo", {
    get: getter2,
});


//// [index.d.ts]
export function test1(): void;
export namespace test1 {
    const foo: string;
}
export function test2(): void;
export namespace test2 {
    const foo_1: any;
    export { foo_1 as foo };
}
