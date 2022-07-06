//// [tests/cases/compiler/moduleDetectionIsolatedModulesCjsFileScope.ts] ////

//// [filename.cts]
const a = 2;
//// [filename.mts]
const a = 2;

//// [filename.cjs]
const a = 2;
export {};
//// [filename.mjs]
const a = 2;
export {};


//// [filename.d.cts]
export {};
//// [filename.d.mts]
export {};
