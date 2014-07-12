/// <reference path="fourslash.ts" />

//// class S18<A, B> extends S18< A[], { }[] >
//// {
//// }
//// (new S18(123))./**/S18 ;
//// 

goTo.marker();
diagnostics.validateTypeAtCurrentPosition();
