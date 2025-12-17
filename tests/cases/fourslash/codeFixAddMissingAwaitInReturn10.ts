/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// async function inner() {
////   return 42;
//// }
////
//// const outer = async () => inner();

verify.getSuggestionDiagnostics([]);
verify.not.codeFixAvailable(ts.Diagnostics.Add_missing_await.message);
