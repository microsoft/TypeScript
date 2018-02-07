/// <reference path="fourslash.ts" />

////interface I { x: number; }
////interface Many<T> extends ReadonlyArray<T> { extra: number; }
////class C { private priv: number; }
////const x: I | I[] | Many<string> | C = { /**/ };

// We specifically filter out any array-like types.
// Private members will be excluded by `createUnionOrIntersectionProperty`.
verify.completionsAt("", ["x"]);
