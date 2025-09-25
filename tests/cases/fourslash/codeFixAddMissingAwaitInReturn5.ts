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
////   try {
////     return await inner();
////   } catch (e) {}
//// }

verify.getSuggestionDiagnostics([]);
verify.not.codeFixAvailable(ts.Diagnostics.Add_missing_await.message);
