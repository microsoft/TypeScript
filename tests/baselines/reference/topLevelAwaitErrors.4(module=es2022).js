//// [topLevelAwaitErrors.4.ts]
export {};

// reparse binding pattern as await should fail
var [await] = [1];


//// [topLevelAwaitErrors.4.js]
// reparse binding pattern as await should fail
var [await] = [1];
export {};
