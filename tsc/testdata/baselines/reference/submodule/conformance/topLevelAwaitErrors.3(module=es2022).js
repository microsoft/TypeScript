//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.3.ts] ////

//// [topLevelAwaitErrors.3.ts]
export {};

// reparse binding pattern as await should fail
var {await} = {await:1};


//// [topLevelAwaitErrors.3.js]
// reparse binding pattern as await should fail
var { await } = { await: 1 };
export {};
