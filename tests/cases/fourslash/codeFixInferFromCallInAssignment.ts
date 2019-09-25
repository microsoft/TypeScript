/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function inferAny( [| app |] ) {
////     const result = app.use('hi')
////     return result
//// }

verify.rangeAfterCodeFix("app: { use: (arg0: string) => any; }");
