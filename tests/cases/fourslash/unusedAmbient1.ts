/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export {};
////declare var [|a|]: string;

// @Filename: /b.d.ts
////declare module 'b' {
////  var [|b|]: string;
////  export {};
////}

goTo.file("/a.ts");
verify.getSuggestionDiagnostics([{
  code: ts.Diagnostics._0_is_declared_but_its_value_is_never_read.code,
  message: "'a' is declared but its value is never read.",
  reportsUnnecessary: true
}]);
verify.getSemanticDiagnostics([]);

goTo.file("/b.d.ts");
verify.getSuggestionDiagnostics([{
  code: ts.Diagnostics._0_is_declared_but_its_value_is_never_read.code,
  message: "'b' is declared but its value is never read.",
  reportsUnnecessary: true
}]);
verify.getSemanticDiagnostics([]);
