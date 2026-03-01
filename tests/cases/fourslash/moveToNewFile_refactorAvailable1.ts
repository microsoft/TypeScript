/// <reference path='fourslash.ts' />

////namespace ns {
////    /*a*/export function fn() {
////    }
////    fn();
////    /*b*/
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Move to a new file",
/*actionName*/ undefined,
/*actionDescription*/ undefined,
/*kind*/ undefined,
    {
        allowTextChangesInNewFiles: true
    },
/*includeInteractiveActions*/ true);
