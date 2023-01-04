//// [self-types-json-simple.ts]
type Json =
  | string
  | number
  | boolean
  | null
  | { toJSON: () => string }
  | (self extends unknown[] ? Json[] : self extends (...a: never[]) => unknown ? never : { [_ in keyof self]: Json })
  | (self extends (...a: never[]) => unknown ? Never<`Type '${Print<self>}' is not assignable to type 'Json'`> : never)

interface Node {
  children: Node[]
  parent: Node
}
let someNode = {} as Node

let t1: Json = someNode // TODO: this should probably compile
let t3: Json = () => "hello"
let t4: Json = {
  x: () => "hello"
}
let t5: Json = {
  toJSON: () => "hello"
}
let t6: Json = new Map()
let t7: Json = ["hello", undefined]
let t8: Json = ["hello", null] as [string, null]

export {}


//// [self-types-json-simple.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var someNode = {};
var t1 = someNode; // TODO: this should probably compile
var t3 = function () { return "hello"; };
var t4 = {
    x: function () { return "hello"; }
};
var t5 = {
    toJSON: function () { return "hello"; }
};
var t6 = new Map();
var t7 = ["hello", undefined];
var t8 = ["hello", null];
