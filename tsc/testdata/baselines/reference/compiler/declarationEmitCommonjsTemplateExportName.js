//// [tests/cases/compiler/declarationEmitCommonjsTemplateExportName.ts] ////

//// [a.js]
const value = 123;
exports[`class`] = value;
exports[`ordinary`] = value;
exports[`default`] = value;
exports[`a b`] = value;
Object.defineProperty(exports, `a b`, { value });
Object.defineProperty(exports, `other name`, { value });




//// [a.d.ts]
export { value as "class" };
export { value as ordinary };
export { value as default };
declare const _exported: number;
export { _exported as "a b" };
declare const _exported_1: number;
export { _exported_1 as "other name" };
declare const value = 123;
