/// <reference path='fourslash.ts' />


////class ns extends ap{
//// constructor() {}
////     
////   export function fn() {
////       console.log("Hello"); /*a*//*b*/
////    }
////    fn();
////    
////}


goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("invoked", "Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
