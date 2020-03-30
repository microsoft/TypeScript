/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export default function () {}
//// export default () => ""
//// export default abc;
//// export default class AB {}

verify.navigationTree({
  "text": '"navigationItemsExportDefaultExpression"',
  "kind": "module",
  "childItems": [
    {
      "text": "default",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "default",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "AB",
      "kind": "class",
      "kindModifiers": "export"
    },
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

