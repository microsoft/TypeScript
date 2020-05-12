// 35477
/// <reference path="fourslash.ts"/>

//// const abc = 12;
//// export = abc;
//// export = function () {}
//// export = () => ""
//// export = class AB {}
//// export = {
////     a: 1,
////     b: 1,
////     c: {
////         d: 1
////     }
//// }

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
      "text": "export=",
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

