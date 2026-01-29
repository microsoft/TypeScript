//// [tests/cases/compiler/duplicateDefaultExport.ts] ////

//// [duplicateDefaultExport.ts]
export default 0;
export default function() {}


//// [duplicateDefaultExport.js]
export default 0;
export default function () { }
