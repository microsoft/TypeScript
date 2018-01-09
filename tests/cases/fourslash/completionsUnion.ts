/// <reference path="fourslash.ts" />

////interface I { x: number; }
////interface Many<T> extends ReadonlyArray<T> { extra: number; }
////const x: I | I[] | Many<string> = { /**/ };

// We specifically filter out any array-like types.
verify.completionsAt("", ["x"]);
