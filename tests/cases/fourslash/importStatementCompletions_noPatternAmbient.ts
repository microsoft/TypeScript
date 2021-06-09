/// <reference path="fourslash.ts" />

// @Filename: /types.d.ts
//// declare module "*.css" {
////   const styles: any;
////   export = styles;
//// }

// @Filename: /index.ts
//// import style/**/

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: true,
  }
});
