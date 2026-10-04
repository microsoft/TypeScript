//// [tests/cases/conformance/salsa/privateIdentifierExpando.ts] ////

//// [privateIdentifierExpando.js]
const x = {};
x.#bar.baz = 20;




//// [privateIdentifierExpando.d.ts]
declare const x: {};
