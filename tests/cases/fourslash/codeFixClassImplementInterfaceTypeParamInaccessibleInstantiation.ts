/// <reference path='fourslash.ts' />

//// namespace N {
////     interface I<T> { x: T; }
////     interface J { a: string; }
////     export type K = I<J>;
//// }
//// class C implements N.K {[| |]} 

verify.not.codeFixAvailable();