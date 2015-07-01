/// <reference path='fourslash.ts'/>

////namespace mod1 {
////    var mX = 1;
////    function mFunc() { }
////    class mClass { }
////    namespace mMod { }
////    interface mInt {}
////    export var meX = 1;
////    export function meFunc() { }
////    export class meClass { }
////    export namespace meMod { export var iMex = 1; }
////    export interface meInt {}
////}
////
////namespace frmConfirm {
////    import Mod1 = mod1;
////    import iMod1 = mod1./*1*/meMod;
////    Mod1./*2*/meX = 1;
////    iMod1./*3*/iMex = 1;
////}

goTo.marker('1');
verify.completionListContains('meX', 'var mod1.meX: number');
verify.completionListContains('meFunc', 'function mod1.meFunc(): void');
verify.completionListContains('meClass', 'class mod1.meClass');
verify.completionListContains('meMod', 'namespace mod1.meMod');
verify.completionListContains('meInt', 'interface mod1.meInt');

goTo.marker('2');
verify.completionListContains('meX', 'var mod1.meX: number');
verify.completionListContains('meFunc', 'function mod1.meFunc(): void');
verify.completionListContains('meClass', 'class mod1.meClass');
verify.completionListContains('meMod', 'namespace mod1.meMod');

goTo.marker('3');
verify.completionListContains('iMex', 'var mod1.meMod.iMex: number');
