/// <reference path='fourslash.ts' />


////class ns /*a*//*b*/extends ap{
//// constructor() {}
////     
////   export function  fn() {
////       console.log("Hello");
////    }
////    fn();
////    
////}


goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("implicit", "Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
