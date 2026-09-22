//// [tests/cases/compiler/jsDocOverloadAnonDefaultExport.ts] ////

//// [jsDocOverloadAnonDefaultExport.js]
/** @overload */
export default function () {}


//// [jsDocOverloadAnonDefaultExport.js]
/** @overload */
export default function () { }


//// [jsDocOverloadAnonDefaultExport.d.ts]
/** @overload */
export default function (): any;
