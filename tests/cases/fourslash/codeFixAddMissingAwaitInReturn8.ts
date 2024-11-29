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
////     [|return|] inner();
////   } catch (e) {}
//// }

verify.getSuggestionDiagnostics([{
    message: ts.Diagnostics.This_may_need_await_keyword_Otherwise_the_enclosing_try_statement_won_t_handle_this.message,
    code: 80011,
    range: test.ranges()[0],
}]);
verify.codeFix({
    description: ts.Diagnostics.Add_missing_await.message,
    index: 0,
    newFileContent:
`function inner(v: number) {
  if (Math.random() > 0.5) {
    return Promise.reject(new Error("Ooops"));
  }
  if (v > 10) {
    return Promise.resolve(100);
  }
  return 42;
}

async function outer() {
  try {
    return await inner();
  } catch (e) {}
}`,
});
