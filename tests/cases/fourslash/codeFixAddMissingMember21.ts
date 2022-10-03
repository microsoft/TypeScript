/// <reference path='fourslash.ts' />

////declare let p: Promise<string>;
////async function f() {
////    p.toLowerCase();
////}

verify.not.codeFixAvailable("fixMissingMember");
