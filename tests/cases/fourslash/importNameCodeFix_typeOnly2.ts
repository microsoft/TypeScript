/// <reference path="fourslash.ts" />

// @importsNotUsedAsValues: error

// @Filename: types.ts
////export class A {}

// @Filename: index.ts
////const a: A = new A();

goTo.file("index.ts");
verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Add_all_missing_imports.message,
  fixId: "fixMissingImport",
  newFileContent:
`import { A } from "./types";

const a: A = new A();`
});
