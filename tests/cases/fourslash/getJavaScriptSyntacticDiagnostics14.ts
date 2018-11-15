/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////Foo<[|number|]>();

verify.getSyntacticDiagnostics([{
    message: "'type arguments' can only be used in a .ts file.",
    code: 8011
}]);
