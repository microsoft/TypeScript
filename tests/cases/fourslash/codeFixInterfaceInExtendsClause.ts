/// <reference path='fourslash.ts' />

//// interface I { }
//// class C extends I { }

verify.fileAfterCodeFix(`
interface I { }
class C implements I { }
`);