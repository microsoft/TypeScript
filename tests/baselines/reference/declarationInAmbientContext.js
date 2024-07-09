//// [tests/cases/conformance/es6/destructuring/declarationInAmbientContext.ts] ////

//// [declarationInAmbientContext.ts]
declare var [a, b];  // Error, destructuring declaration not allowed in ambient context
declare var {c, d};  // Error, destructuring declaration not allowed in ambient context


//// [declarationInAmbientContext.js]
