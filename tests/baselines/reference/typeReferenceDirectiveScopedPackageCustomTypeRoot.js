//// [tests/cases/compiler/typeReferenceDirectiveScopedPackageCustomTypeRoot.ts] ////

//// [index.d.ts]
declare const typesCache: number;

//// [index.d.ts]
declare const mangledTypes: number;

//// [index.d.ts]
declare const nodeModulesCache: number;

//// [index.d.ts]
declare const mangledNodeModules: number;

//// [index.d.ts]
declare const atTypesCache: number;

//// [index.d.ts]
declare const mangledAtTypesCache: number;

//// [a.ts]
typesCache;
mangledAtTypesCache;
nodeModulesCache;
mangledNodeModules;
atTypesCache;
mangledAtTypesCache;

//// [a.js]
typesCache;
mangledAtTypesCache;
nodeModulesCache;
mangledNodeModules;
atTypesCache;
mangledAtTypesCache;
