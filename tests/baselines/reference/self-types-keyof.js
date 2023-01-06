//// [self-types-keyof.ts]
// Implementing index types without index types

type KeyOf<T> =
  self extends string | number | symbol
    ? T extends { [_ in self]: unknown }
        ? self
        : Never<`Type '${Print<self>}' can't be used to index type '${Print<T>}'`>
    : string | number | symbol

let t0: KeyOf<{ a: number }> = "a"
let t1: KeyOf<{ a: number }> = "b"

declare const get:
  <T, K extends KeyOf<T>>(t: T, k: K) =>
    T extends { [_ in K]: infer X } ? X : never

let t3: number = get({ a: 10 }, "a")
let t4 = get({ a: 10 }, "b")

export {}


//// [self-types-keyof.js]
"use strict";
// Implementing index types without index types
Object.defineProperty(exports, "__esModule", { value: true });
var t0 = "a";
var t1 = "b";
var t3 = get({ a: 10 }, "a");
var t4 = get({ a: 10 }, "b");
