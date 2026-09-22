//// [tests/cases/compiler/jsDocOverloadNamedDefaultExport.ts] ////

//// [jsDocOverloadNamedDefaultExport.js]
/** @overload */
export default function foo() {}


//// [jsDocOverloadNamedDefaultExport.js]
/** @overload */
export default function foo() { }


//// [jsDocOverloadNamedDefaultExport.d.ts]
/** @overload */
export default function foo(): any;
