//// [tests/cases/conformance/es6/destructuring/destructuringReassignsRightHandSide.ts] ////

//// [destructuringReassignsRightHandSide.ts]
var foo: any = { foo: 1, bar: 2 };
var bar: any;

// reassignment in destructuring pattern
({ foo, bar } = foo);

// reassignment in subsequent var
var { foo, baz } = foo;

//// [destructuringReassignsRightHandSide.js]
var _a;
var foo = { foo: 1, bar: 2 };
var bar;
// reassignment in destructuring pattern
(_a = foo, foo = _a.foo, bar = _a.bar);
// reassignment in subsequent var
var _b = foo, foo = _b.foo, baz = _b.baz;
