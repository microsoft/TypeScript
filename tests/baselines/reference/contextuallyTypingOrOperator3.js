//// [tests/cases/compiler/contextuallyTypingOrOperator3.ts] ////

//// [contextuallyTypingOrOperator3.ts]
function foo<T, U extends T>(u: U) {
    var x3: U = u || u;
}

//// [contextuallyTypingOrOperator3.js]
function foo(u) {
    var x3 = u || u;
}
