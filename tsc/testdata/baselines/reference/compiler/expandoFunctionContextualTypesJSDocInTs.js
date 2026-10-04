//// [tests/cases/compiler/expandoFunctionContextualTypesJSDocInTs.ts] ////

//// [expandoFunctionContextualTypesJSDocInTs.ts]
export function Foo() { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };


//// [expandoFunctionContextualTypesJSDocInTs.js]
export function Foo() { }
// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };
