/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// async function inner() {
////   return 42;
//// }
////
//// async function outer(v: number) {
////   try {
////     if (v > 30) {
////       [|return|] inner();
////     }
////     if (v > 20) {
////       return await inner();
////     }
////     if (v > 10) {
////       [|return|] inner();
////     }
////     [|return|] inner();
////   } catch (e) {}
//// }

verify.getSuggestionDiagnostics([{
    message: ts.Diagnostics.This_may_need_await_keyword_Otherwise_the_enclosing_try_statement_won_t_handle_this.message,
    code: 80011,
    range: test.ranges()[0],
}, {
    message: ts.Diagnostics.This_may_need_await_keyword_Otherwise_the_enclosing_try_statement_won_t_handle_this.message,
    code: 80011,
    range: test.ranges()[1],
}, {
    message: ts.Diagnostics.This_may_need_await_keyword_Otherwise_the_enclosing_try_statement_won_t_handle_this.message,
    code: 80011,
    range: test.ranges()[2],
}]);
verify.codeFixAll({
    fixId: "addMissingAwaitInReturn",
    fixAllDescription: ts.Diagnostics.Add_all_missing_awaits.message,
    newFileContent:
`async function inner() {
  return 42;
}

async function outer(v: number) {
  try {
    if (v > 30) {
      return await inner();
    }
    if (v > 20) {
      return await inner();
    }
    if (v > 10) {
      return await inner();
    }
    return await inner();
  } catch (e) {}
}`,
});
