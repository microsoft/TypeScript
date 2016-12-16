/// <reference path='fourslash.ts'/>

//// type MixinCtor<A> = new () => /*0*/A & { constructor: MixinCtor</*1*/A> };
//// type MixinCtor<A> = new () => A & { constructor: { constructor: MixinCtor</*2*/A> } };

verify.baselineQuickInfo();