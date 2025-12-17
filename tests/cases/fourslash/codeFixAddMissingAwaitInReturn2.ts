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
`async function inner() {
  if (Math.random() > 0.5) {
    throw new Error("Ooops");
  }
  return 42;
}

async function outer() {
  try {
    return await inner();
  } catch (e) {}
}`,
});
