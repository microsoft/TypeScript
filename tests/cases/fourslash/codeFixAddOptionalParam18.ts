/// <reference path="fourslash.ts" />

////[|function f(a: number, c: string) {}|]
////f(1, 1, "");

verify.not.codeFixAvailable("addOptionalParam");
