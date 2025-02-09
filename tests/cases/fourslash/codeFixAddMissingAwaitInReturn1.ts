/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// async function inner() {
////   if (Math.random() > 0.5) {
////     throw new Error("Ooops");
////   }
////   return 42;
//// }
////
//// async function outer() {
////   return inner();
//// }

verify.getSuggestionDiagnostics([]);
verify.not.codeFixAvailable(ts.Diagnostics.Add_missing_await.message);
