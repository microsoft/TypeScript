/// <reference path="../fourslash.ts" />

// @allowJs: true
// @Filename: b.js
////var a = "a";
////var b: [|boolean|] = true;
////function foo(): [|string|] { }
////var [|var|] [|=|] [|"c"|];

verify.getSyntacticDiagnostics([
  {
    message: "'types' can only be used in a .ts file.",
    range: test.ranges()[0],
    code: 8010
  },
  {
    message: "\'types\' can only be used in a .ts file.",
    range: test.ranges()[1],
    code: 8010
  },
  {
    message: "Variable declaration expected.",
    range: test.ranges()[2],
    code: 1134
  },
  {
    message: "Variable declaration expected.",
    range: test.ranges()[3],
    code: 1134
  },
  {
    message: "Variable declaration expected.",
    range: test.ranges()[4],
    code: 1134
  },
]);
verify.getSemanticDiagnostics([]);
