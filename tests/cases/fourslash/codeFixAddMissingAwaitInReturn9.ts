/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// function inner(v: number) {
////   if (Math.random() > 0.5) {
////     return Promise.reject(new Error("Ooops"));
////   }
////   if (v > 10) {
////     return Promise.resolve(100);
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
