/// <reference path='fourslash.ts' />

//// interface I1 { }
//// class C1 extends I1 { }
//// interface I2 { }
//// class C2 extends I2 { }

// verify.codeFixAvailable();
verify.fileAfterCodeFixes(`
interface I1 { }
class C1 implements I1 { }
interface I2 { }
class C2 implements I2 { }
`);