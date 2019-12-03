/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export default abc;

verify.navigationTree({
  "text": '"navigationItemsExportDefaultExpression"',
  "kind": "module",
  "childItems": [
    {
      "text": "abc",
      "kind": "const"
    },
    {
      "text": "default",
      "kind": "const",
      "kindModifiers": "export"
    }
  ]
});

