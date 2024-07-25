/// <reference path='fourslash.ts' />



////   export function fn() {
////       /*a*/console.log("Hello"); /*b*/
////    }
////    fn();



goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("invoked", "Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
