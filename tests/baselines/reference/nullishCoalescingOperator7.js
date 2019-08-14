//// [nullishCoalescingOperator7.ts]
declare const a: string | undefined;
declare const b: string | undefined;
declare const c: string | undefined;

const foo1 = a ? 1 : 2;
const foo2 = a ?? 'foo' ? 1 : 2;
const foo3 = a ?? 'foo' ? (b ?? 'bar') : (c ?? 'baz');

function f () {
    const foo4 = a ?? 'foo' ? b ?? 'bar' : c ?? 'baz';
}


//// [nullishCoalescingOperator7.js]
"use strict";
var foo1 = a ? 1 : 2;
var foo2 = typeof a !== "undefined" && a !== null ? a : 'foo' ? 1 : 2;
var foo3 = typeof a !== "undefined" && a !== null ? a : 'foo' ? (typeof b !== "undefined" && b !== null ? b : 'bar') : (typeof c !== "undefined" && c !== null ? c : 'baz');
function f() {
    var foo4 = typeof a !== "undefined" && a !== null ? a : 'foo' ? typeof b !== "undefined" && b !== null ? b : 'bar' : typeof c !== "undefined" && c !== null ? c : 'baz';
}
