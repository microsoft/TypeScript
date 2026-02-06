/// <reference path="fourslash.ts" />

// @stableTypeOrdering: true
//// function conversionTest(groupName: | "downcast" | "dataDowncast" | "editingDowncast" | `${string}Downcast` & {}) {}
//// conversionTest("/**/");

verify.completions({ marker: "", exact: ["dataDowncast", "downcast", "editingDowncast"] });
