//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionKeywordProp.ts] ////

//// [source.js]
function foo() {}
foo.null = true;

function bar() {}
bar.async = true;
bar.normal = false;

function baz() {}
baz.class = true;
baz.normal = false;

//// [source.js]
function foo() { }
foo.null = true;
function bar() { }
bar.async = true;
bar.normal = false;
function baz() { }
baz.class = true;
baz.normal = false;


//// [source.d.ts]
declare function foo(): void;
declare function bar(): void;
declare function baz(): void;
