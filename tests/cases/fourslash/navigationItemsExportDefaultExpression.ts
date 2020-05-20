/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export default function () {}
//// export default () => ""
//// export default abc;
//// export default class AB {}
//// export default {
////     a: 1,
////     b: 1,
////     c: {
////         d: 1
////     }
//// }

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
      "text": "default",
      "kind": "const",
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "a",
          "kind": "property"
        },
        {
          "text": "b",
          "kind": "property"
        },
        {
          "text": "c",
          "kind": "property",
          "childItems": [
            {
              "text": "d",
              "kind": "property"
            }
          ]
        }
      ]
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

