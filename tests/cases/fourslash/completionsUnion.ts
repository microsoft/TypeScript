/// <reference path="fourslash.ts" />

////interface I { x: number; }
////const x: I | I[] = { /**/ };

// We will choose to provide completions for `I` but not `Array`,
// since `I` has only properties, not methods.
verify.completionsAt("", ["x"]);
