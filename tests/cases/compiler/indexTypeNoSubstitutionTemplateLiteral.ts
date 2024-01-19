// @strict: true

function Foo() {}
Foo[`b`] = function () {};

type Test = keyof typeof Foo;

