/// <reference path="fourslash.ts" />

////const a = {
////   b: { f(x: number) {} }
////}
////a.b.f(foo);

verify.not.codeFixAvailable("fixMissingFunctionDeclaration");
