/// <reference path="fourslash.ts" />

////export const x/*a*/ = 1;
////const y/*b*/ = 2;
////const z = x + 1;
////const w = 2 + y;
////export { y };

goTo.marker("a");
verify.not.refactorAvailable("Inline variable");

goTo.marker("b");
verify.not.refactorAvailable("Inline variable");