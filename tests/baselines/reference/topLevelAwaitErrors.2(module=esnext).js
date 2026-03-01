//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.2.ts] ////

//// [topLevelAwaitErrors.2.ts]
export {};

// reparse variable name as await should fail
var await = 1;


//// [topLevelAwaitErrors.2.js]
// reparse variable name as await should fail
var await = 1;
export {};
