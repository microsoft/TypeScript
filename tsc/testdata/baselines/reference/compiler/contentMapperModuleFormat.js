//// [tests/cases/compiler/contentMapperModuleFormat.ts] ////

//// [package.json]
{ "type": "module" }

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [expected-esm.esm]
const __VERSION = "1.0.0";
// @box-extension: .cts
export const value = 1;

//// [expected-cjs.cbox]
const __VERSION = "1.0.0";
// @box-extension: .mts
export const value = 1;

//// [package-inferred.box]
const __VERSION = "1.0.0";
// @box-extension: .cts
export const value = 1;




//// [expected-esm.d.mts]
export declare const value = 1;
//// [expected-cjs.d.cts]
export declare const value = 1;
//// [package-inferred.d.box.ts]
export declare const value = 1;
