// 35477
/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export = abc;
//// export = function () {}
//// export = () => ""
//// export = class AB {}

verify.navigationTree({
  "text": '"navigationItemsExportEqualsExpression"',
  "kind": "module",
  "childItems": [
    {
      "text": "export=",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "export=",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "export=",
      "kind": "class",
      "kindModifiers": "export"
    },
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

