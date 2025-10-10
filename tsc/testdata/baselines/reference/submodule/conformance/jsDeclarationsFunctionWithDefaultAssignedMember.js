//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionWithDefaultAssignedMember.ts] ////

//// [index.js]
function foo() {}

foo.foo = foo;
foo.default = foo;
module.exports = foo;

//// [index.js]
function foo() { }
foo.foo = foo;
foo.default = foo;
export = foo;
module.exports = foo;


//// [index.d.ts]
declare function foo(): void;
declare namespace foo {
    var foo: typeof import(".");
}
declare namespace foo {
    var _a: typeof import(".");
    export { _a as default };
}
export = foo;
