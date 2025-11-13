/// <reference path='fourslash.ts' />


////    export /*a*//*b*/function fn()  { 
////        console.log('Hello')
////    }
////    fn();



goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("implicit", "Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
