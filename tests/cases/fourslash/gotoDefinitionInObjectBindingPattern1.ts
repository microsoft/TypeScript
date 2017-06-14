/// <reference path='fourslash.ts' />

//// function bar<T>(onfulfilled: (value: T) => void) {
////   return undefined;
//// }

//// interface Test {
////   pro/*destination*/p2: number
//// }
//// bar<Test>(({pr/*goto*/op2})=>{});

verify.goToDefinition("goto", "destination")