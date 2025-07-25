/// <reference path="fourslash.ts" />

// @noLib: true

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

// Scenarios where case/default should be prioritized
goTo.marker("basic");
verify.completions({
    includes: [
        { name: "case", sortText: "10" },
        { name: "default", sortText: "10" }
    ]
});

goTo.marker("newPrio1");
verify.completions({
    includes: [
        { name: "case", sortText: "10" },
        { name: "default", sortText: "10" }
    ]
});

goTo.marker("newPrio2");
verify.completions({
    includes: [
        { name: "case", sortText: "10" },
        { name: "default", sortText: "10" }
    ]
});

goTo.marker("newPrio3");
verify.completions({
    includes: [
        { name: "case", sortText: "10" },
        { name: "default", sortText: "10" }
    ]
});

goTo.marker("newPrio4");
verify.completions({
    includes: [
        { name: "case", sortText: "10" },
        { name: "default", sortText: "10" }
    ]
});

// Scenarios where case/default should NOT be prioritized
goTo.marker("sameAll1");
verify.completions({
    includes: [
        { name: "case", sortText: "15" },
        { name: "default", sortText: "15" }
    ]
});

goTo.marker("sameAll2");
verify.completions({
    includes: [
        { name: "case", sortText: "15" },
        { name: "default", sortText: "15" }
    ]
});

goTo.marker("sameAll3");
verify.completions({
    includes: [
        { name: "case", sortText: "15" },
        { name: "default", sortText: "15" }
    ]
});