/// <reference path='fourslash.ts' />

// @Filename: bar.ts
//// import * as foo from './foo'
//// export as namespace foo
//// export = foo;
//// 
//// declare global {
////     const foo: typeof foo;
//// }

// @Filename: foo.d.ts
//// interface Root {
////     /**
////      * A .default property for ES6 default import compatibility
////      */
////     default: Root;
//// }
//// 
//// declare const root: Root;
//// export = root;

goTo.file("bar.ts");
verify.not.codeFixAvailable();
goTo.file("foo.d.ts");
verify.not.codeFixAvailable();
