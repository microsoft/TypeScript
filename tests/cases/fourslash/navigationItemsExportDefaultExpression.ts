/// <reference path="fourslash.ts"/>

//// export default function () {}
//// export default function () {
////     return class Foo {
////     }
//// }
////
//// export default () => ""
//// export default () => {
////     return class Foo {
////     }
//// }
////
//// export default function f1() {}
//// export default function f2() {
////     return class Foo {
////     }
//// }
////
//// const abc = 12;
//// export default abc;
//// export default class AB {}
//// export default {
////     a: 1,
////     b: 1,
////     c: {
////         d: 1
////     }
//// }
////
//// function foo(props: { x: number; y: number }) {}
//// export default foo({ x: 1, y: 1 });

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
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "Foo",
          "kind": "class"
        }
      ]
    },
    {
      "text": "default",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "default",
      "kind": "function",
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "Foo",
          "kind": "class"
        }
      ]
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
      "text": "default",
      "kind": "const",
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "x",
          "kind": "property"
        },
        {
          "text": "y",
          "kind": "property"
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
    },
    {
      "text": "f1",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "f2",
      "kind": "function",
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "Foo",
          "kind": "class"
        }
      ]
    },
    {
      "text": "foo",
      "kind": "function"
    }
  ]
});

