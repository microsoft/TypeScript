//// [moduleExportAliasDuplicateAlias.js]
exports.apply = undefined;
exports.apply = undefined;
function a() { }
exports.apply = a;


//// [moduleExportAliasDuplicateAlias.js]
"use strict";
exports.apply = undefined;
exports.apply = undefined;
function a() { }
exports.apply = a;


//// [moduleExportAliasDuplicateAlias.d.ts]
export { undefined as apply };
