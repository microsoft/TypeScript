/// <reference path="../fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////var [|===|][|;|]

verify.getSyntacticDiagnostics([
  {
    message: "Variable declaration expected.",
    range: test.ranges()[0],
    code: 1134
  },
  {
    message: "Expression expected.",
    range: test.ranges()[1],
    code: 1109
  },
]);
verify.getSemanticDiagnostics([]);
