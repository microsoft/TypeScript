// @strict: true
// @target: es2021

// The signatures of String.prototype.{replace,replaceAll} should be identical
let { replace, replaceAll } = "";
replace = replaceAll;
replaceAll = replace;
