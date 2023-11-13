//// [tests/cases/conformance/es6/destructuring/declarationInAmbientContext.ts] ////

//// [declarationInAmbientContext.ts]
declare var [a, b];  // Error, destructuring declaration not allowed in ambient context
declare var {c, d};  // Error, destructuring declaration not allowed in ambient context


/// [Declarations] ////



//// [declarationInAmbientContext.d.ts]
declare var a: any, b: any;
declare var c: any, d: any;
