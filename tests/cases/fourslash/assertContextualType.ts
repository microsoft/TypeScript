/// <reference path='fourslash.ts' />

////<(aa: number) =>void >(function myFn(b/**/b) { });

goTo.marker();
verify.quickInfoIs('(parameter) bb: number');