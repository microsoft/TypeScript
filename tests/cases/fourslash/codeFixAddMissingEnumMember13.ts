/// <reference path="fourslash.ts" />

////enum E { A, B }
////declare var a: E;
////a.C;

verify.not.codeFixAvailable("fixMissingMember");
