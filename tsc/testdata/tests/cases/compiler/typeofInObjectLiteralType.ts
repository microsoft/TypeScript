// @target: es2015
var a: { b: number; c: typeof b }; // Should give error for attempting to use type query on b.