/// <reference path='fourslash.ts' />

//// function bar<T>(onfulfilled: (value: T) => void) {
////   return undefined;
//// }

//// interface Test {
////   /*destination*/prop2: number
//// }
//// bar<Test>(({[|pr/*goto*/op2|]})=>{});

verify.baselineGoToDefinition("goto");