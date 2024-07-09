//// [tests/cases/compiler/intersectionPropertyCheck.ts] ////

//// [intersectionPropertyCheck.ts]
let obj: { a: { x: string } } & { c: number } = { a: { x: 'hello', y: 2 }, c: 5 };  // Nested excess property

declare let wrong: { a: { y: string } };
let weak: { a?: { x?: number } } & { c?: string } = wrong;  // Nested weak object type

function foo<T extends object>(x: { a?: string }, y: T & { a: boolean }) {
  x = y;  // Mismatched property in source intersection
}

// Repro from #36637

interface Test {
  readonly hi?: string[]
}

function test<T extends object>(value: T): Test {
  return { ...value, hi: true }
}


//// [intersectionPropertyCheck.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var obj = { a: { x: 'hello', y: 2 }, c: 5 }; // Nested excess property
var weak = wrong; // Nested weak object type
function foo(x, y) {
    x = y; // Mismatched property in source intersection
}
function test(value) {
    return __assign(__assign({}, value), { hi: true });
}
