/// <reference path='fourslash.ts' />

////     export function fn(){ 
////        console.log('Hello')/*a*//*b*/
////    }
////    fn();

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
