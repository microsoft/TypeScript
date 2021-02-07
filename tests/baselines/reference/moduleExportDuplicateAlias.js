//// [moduleExportAliasDuplicateAlias.js]
exports.apply = undefined;
function a() { }
exports.apply = a;


//// [moduleExportAliasDuplicateAlias.js]
exports.apply = undefined;
function a() { }
exports.apply = a;


//// [moduleExportAliasDuplicateAlias.d.ts]
export { undefined as apply };
