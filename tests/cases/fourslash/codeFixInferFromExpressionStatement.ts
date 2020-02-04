/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function inferVoid( [| app |] ) {
////     app.use('hi')
//// }

verify.rangeAfterCodeFix("app: { use: (arg0: string) => void; }");
