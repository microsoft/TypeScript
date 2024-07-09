//// [tests/cases/compiler/jsdocTypecastNoTypeNoCrash.ts] ////

//// [index.js]
function Foo() {}
const a = /* @type string */(Foo);


//// [index.js]
function Foo() { }
var a = /* @type string */ (Foo);
