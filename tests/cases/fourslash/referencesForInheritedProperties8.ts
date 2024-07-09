/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     /*d*/propD: number;
//// }
//// interface D extends C {
////     propD: string;
////     /*c*/propC: number;
//// }
//// var d: D;
//// d.propD;
//// d.propC;

verify.baselineFindAllReferences('d', 'c')
