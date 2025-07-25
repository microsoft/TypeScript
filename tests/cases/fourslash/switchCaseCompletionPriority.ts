/// <reference path="fourslash.ts" />

//// declare const thing: string;

//// // Basic switch block - should prioritize case/default
//// switch (thing) {
////     /*basic*/
//// }

//// // Same - show all completions (not at switch body level)
//// switch (thing) {
////   case 42:
////   /*sameAll1*/
//// }

//// // Same - show all completions (after break at same column as case)
//// switch (thing) {
////   case 42:
////   break;
////   /*sameAll2*/
//// }

//// // Same - show all completions (complex nested structure)
//// switch (thing) {
////   case 42:
////   if (Math.random()) {
////   }
////   else {
////   }
////   /*sameAll3*/
//// }

//// // After break statement with proper indentation
//// switch (thing) {
////   case 42:
////     break;
////   /*newPrio1*/
//// }

//// // After same-line break statement
//// switch (thing) {
////   case 42: break;
////   /*newPrio2*/
//// }

//// // After return statement with proper indentation
//// switch (thing) {
////   case 42:
////     return 1;
////   /*newPrio3*/
//// }

//// // After throw statement with proper indentation
//// switch (thing) {
////   case 42:
////     throw new Error();
////   /*newPrio4*/
//// }

goTo.marker("basic");
verify.baselineCompletions();

goTo.marker("sameAll1");
verify.baselineCompletions();

goTo.marker("sameAll2");
verify.baselineCompletions();

goTo.marker("sameAll3");
verify.baselineCompletions();

goTo.marker("newPrio1");
verify.baselineCompletions();

goTo.marker("newPrio2");
verify.baselineCompletions();

goTo.marker("newPrio3");
verify.baselineCompletions();

goTo.marker("newPrio4");
verify.baselineCompletions();