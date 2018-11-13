// @target: es5
var foo: any = { foo: 1, bar: 2 };
var bar: any;

// reassignment in destructuring pattern
({ foo, bar } = foo);

// reassignment in subsequent var
var { foo, baz } = foo;