/// <reference path="fourslash.ts" />

//// function iterateTuples(tuples: [string, string][]) {
////     tuples.forEach((t) => {})
//// }

verify.baselineInlayHints(undefined, {
  includeInlayVariableTypeHints: true,
  includeInlayParameterNameHints: "all",
  includeInlayFunctionParameterTypeHints: true,
});
