/// <reference path="fourslash.ts" />

// @noLib: true

//// declare const thing: string;
//// declare const console: { log(x: any): void; };

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

// Test scenarios that show the relative ordering of case, default, and other completions

// Basic switch block - should prioritize case/default over other completions
goTo.marker("basic");
verify.baselineCompletions();
// Also verify that 'thing' is still available
verify.completions({
    includes: [
        { name: "thing", sortText: "11" }
    ]
});

// After break statement with proper indentation - should prioritize case/default
goTo.marker("newPrio1");
verify.baselineCompletions();
// Also verify that 'thing' is still available
verify.completions({
    includes: [
        { name: "thing", sortText: "11" }
    ]
});

// Should NOT prioritize case/default (normal ordering)
goTo.marker("sameAll1");
verify.baselineCompletions();
// Also verify that 'thing' is still available
verify.completions({
    includes: [
        { name: "thing", sortText: "11" }
    ]
});