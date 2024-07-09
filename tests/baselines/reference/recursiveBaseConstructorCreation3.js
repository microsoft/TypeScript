//// [tests/cases/compiler/recursiveBaseConstructorCreation3.ts] ////

//// [recursiveBaseConstructorCreation3.ts]
declare class base<T> {
}
declare class abc<T> extends base<T> {
    foo: xyz;
}
declare class xyz extends abc {
}

var bar = new xyz(); // Error: Invalid 'new' expression.
var r: xyz = bar.foo;

//// [recursiveBaseConstructorCreation3.js]
var bar = new xyz(); // Error: Invalid 'new' expression.
var r = bar.foo;
