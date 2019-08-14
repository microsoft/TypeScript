//// [nullishCoalescingOperator6.ts]
function foo(foo: string, bar = foo ?? "bar") { }


//// [nullishCoalescingOperator6.js]
"use strict";
function foo(foo, bar) {
    if (bar === void 0) { bar = typeof foo !== "undefined" && foo !== null ? foo : "bar"; }
}
