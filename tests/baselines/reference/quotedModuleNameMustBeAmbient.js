//// [tests/cases/compiler/quotedModuleNameMustBeAmbient.ts] ////

//// [quotedModuleNameMustBeAmbient.ts]
module 'M' {}

declare module 'M2' {}

//// [quotedModuleNameMustBeAmbient.js]
