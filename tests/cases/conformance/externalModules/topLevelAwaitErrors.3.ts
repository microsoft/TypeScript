// @target: esnext
// @module: es2022,esnext

export {};

// reparse binding pattern as await should fail
var {await} = {await:1};
