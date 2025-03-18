//// [tests/cases/compiler/moduleDetectionIsolatedModulesCjsFileScope.ts] ////

//// [filename.cts]
const a = 2;
//// [filename.mts]
const a = 2;

//// [filename.cjs]
const a = 2;
//// [filename.mjs]
const a = 2;
