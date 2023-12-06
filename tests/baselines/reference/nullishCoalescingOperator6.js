//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator6.ts] ////

//// [nullishCoalescingOperator6.ts]
function foo(foo: string, bar = foo ?? "bar") { }


//// [nullishCoalescingOperator6.js]
"use strict";
function foo(foo, bar) {
    if (bar === void 0) { bar = foo !== null && foo !== void 0 ? foo : "bar"; }
}
