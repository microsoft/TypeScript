/// <reference path='fourslash.ts' />

////let a = { b: ()=> {
////    return {
////        c: ()=> {
////            return {
////                d: 0
////            }
////        }
////    }
////}};
/////*1a*//*2a*/a && a.b && a.b().c/*1b*/ && a.b().c().d;/*2b*/

// We should stop at the first call for b since it may not be a pure function.
goTo.select("2a", "2b");
verify.not.refactorAvailable("Convert to optional chain expression");

goTo.select("1a", "1b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: ()=> {
    return {
        c: ()=> {
            return {
                d: 0
            }
        }
    }
}};
a?.b?.().c && a.b().c().d;`
});