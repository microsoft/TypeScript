// 35477
/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export = abc;

verify.navigationTree({
  "text": '"navigationItemsExportEqualsExpression"',
  "kind": "module",
  "childItems": [
    {
      "text": "abc",
      "kind": "const"
    },
    {
      "text": "export=",
      "kind": "const",
      "kindModifiers": "export"
    }
  ]
});

