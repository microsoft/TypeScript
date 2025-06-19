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
export = foo;


//// [DtsFileErrors]


out/index.d.ts(1,10): error TS2304: Cannot find name 'foo'.


==== out/index.d.ts (1 errors) ====
    export = foo;
             ~~~
!!! error TS2304: Cannot find name 'foo'.
    