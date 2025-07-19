/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// async function fn() {
////   try {
////     return 42;
////   } catch (e) {}
//// }

verify.getSuggestionDiagnostics([]);
verify.not.codeFixAvailable(ts.Diagnostics.Add_missing_await.message);
