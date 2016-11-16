//// [typePredicateInLoop.ts]
// Repro from #12101

interface Type {
  type: number;
}

interface TypeExt extends Type {
  arr: Type[];
}

const guard = (arg: Type): arg is TypeExt => arg.type === 1;
const otherFunc = (arg1: Type, arg2: TypeExt): void => {};

export function y(arg: Type): void {
  if (guard(arg)) {
    for (const ITEM of arg.arr) {
      if (otherFunc(ITEM, arg)) {
      }
    }
  }
}

//// [typePredicateInLoop.js]
// Repro from #12101
"use strict";
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var guard = function (arg) { return arg.type === 1; };
var otherFunc = function (arg1, arg2) { };
function y(arg) {
    if (guard(arg)) {
        try {
            for (var iterator_1 = { iterator: __values(arg.arr) }; __step(iterator_1);) {
                var ITEM = iterator_1.result.value;
                if (otherFunc(ITEM, arg)) {
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
        }
    }
    var e_1;
}
exports.y = y;
