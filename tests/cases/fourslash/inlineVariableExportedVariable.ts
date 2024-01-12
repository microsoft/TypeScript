/// <reference path="fourslash.ts" />

////export const /*a1*/x/*b1*/ = 1;
////const /*a2*/y/*b2*/ = 2;
////const /*a3*/z/*b3*/ = 3;
////const u = x + 1;
////const v = 2 + y;
////export { y };
////export { z as w };

goTo.select("a1", "b1");
verify.not.refactorAvailable("Inline variable");

goTo.select("a2", "b2");
verify.not.refactorAvailable("Inline variable");

goTo.select("a3", "b3");
verify.not.refactorAvailable("Inline variable");