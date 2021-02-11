//// [moduleExportAliasDuplicateAlias.js]
module.exports.apply = undefined;
function a() { }
module.exports.apply = a;


//// [moduleExportAliasDuplicateAlias.js]
"use strict";
module.exports.apply = undefined;
function a() { }
module.exports.apply = a;


//// [moduleExportAliasDuplicateAlias.d.ts]
export { a as apply };
declare function a(): void;
