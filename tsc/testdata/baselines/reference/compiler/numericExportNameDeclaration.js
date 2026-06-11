//// [tests/cases/compiler/numericExportNameDeclaration.ts] ////

//// [bug.js]
exports[1] = 2;
module.exports[1] = 2;
Object.defineProperty(exports, 1, {});




//// [bug.d.ts]
declare const _exported: any;
export { _exported as "1" };
