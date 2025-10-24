//// [tests/cases/conformance/jsdoc/jsdocTemplateTagNameResolution.ts] ////

//// [file.js]
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */

const x = { a: 1 };

/** @type {Foo<typeof x, "a">} */
const y = "a";

//// [file.js]
"use strict";
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */
Object.defineProperty(exports, "__esModule", { value: true });
const x = { a: 1 };
/** @type {Foo<typeof x, "a">} */
const y = "a";


//// [file.d.ts]
/**
 * @template T
 * @template {keyof T} K
 * @typedef {T[K]} Foo
 */
export type Foo<T, K extends keyof T> = T[K];
