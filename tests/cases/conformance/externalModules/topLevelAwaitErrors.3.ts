// @target: esnext
// @module: esnext

export {};

// reparse binding pattern as await should fail
var {await} = {await:1};
