/// <reference path="fourslash.ts" />

////function foo() {
////    /*1*/if (true) {
////        console.log(1);
////    } else {
////        console.log(1);
////    }
////
////    do {
////        console.log(1);
////    }
////
////    while (true);
////
////    try {
////        console.log(1);
////    } catch {
////        void 0;
////    } finally {
////        void 0;
////    }/*2*/
////}

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in global scope",
  newContent:
`function foo() {
    /*RENAME*/newFunction();
}

function newFunction() {
    if (true) {
        console.log(1);
    } else {
        console.log(1);
    }

    do {
        console.log(1);
    }

    while (true);

    try {
        console.log(1);
    } catch {
        void 0;
    } finally {
        void 0;
    }
}
`
});
