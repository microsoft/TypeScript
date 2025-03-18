//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator6.ts] ////

//// [nullishCoalescingOperator6.ts]
function foo(foo: string, bar = foo ?? "bar") { }


//// [nullishCoalescingOperator6.js]
function foo(foo, bar = foo ?? "bar") { }
