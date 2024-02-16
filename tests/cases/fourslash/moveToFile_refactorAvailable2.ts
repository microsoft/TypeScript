/// <reference path='fourslash.ts' />

/////*a*/
////namespace ns {
////    export function fn() {
////    }
////    fn();
////}
/////*b*/

goTo.select("a", "b");
verify.not.refactorAvailable("Move to file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
{
    allowTextChangesInNewFiles : true
},
/*includeInteractiveActions*/ true);

