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
module.exports = foo;


//// [index.d.ts]
export = foo;
declare function foo(): void;
declare namespace foo {
    export { foo };
    export { foo as default };
}
