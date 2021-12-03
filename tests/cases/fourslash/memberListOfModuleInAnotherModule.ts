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

const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "meClass", text: "class mod1.meClass" },
    { name: "meFunc", text: "function mod1.meFunc(): void" },
    { name: "meMod", text: "namespace mod1.meMod" },
    { name: "meX", text: "var mod1.meX: number" },
];
verify.completions(
    { marker: "1", unsorted: [...values, { name: "meInt", text: "interface mod1.meInt" }] },
    { marker: "2", exact: values },
    { marker: "3", exact: { name: "iMex", text: "var mod1.meMod.iMex: number" } },
);
