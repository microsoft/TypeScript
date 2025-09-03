//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator7.ts] ////

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
const foo1 = a ? 1 : 2;
const foo2 = a ?? 'foo' ? 1 : 2;
const foo3 = a ?? 'foo' ? (b ?? 'bar') : (c ?? 'baz');
function f() {
    const foo4 = a ?? 'foo' ? b ?? 'bar' : c ?? 'baz';
}
