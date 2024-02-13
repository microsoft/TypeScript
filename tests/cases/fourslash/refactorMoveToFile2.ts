/// <reference path='fourslash.ts' />

/////*a*/
////namespace ns {
////    export function fn() {
////    }
////    fn();
////}
/////*b*/

goTo.select("a", "b");
verify.refactorAvailable("Move to file",
undefined,
undefined,
undefined,
{
    allowTextChangesInNewFiles : true
},
true);

