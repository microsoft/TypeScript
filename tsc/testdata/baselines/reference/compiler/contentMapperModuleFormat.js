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

//// [expected-cjs.cbox]

//// [package-inferred.box]




//// [expected-esm.d.mts]
export {};
//// [expected-cjs.d.cts]
export {};
//// [package-inferred.d.box.ts]
export {};
