// 35477
/// <reference path="fourslash.ts"/>

//// export = function () {}
//// export = function () {
////     return class Foo {
////     }
//// }
////
//// export = () => ""
//// export = () => {
////     return class Foo {
////     }
//// }
////
//// export = function f1() {}
//// export = function f2() {
////     return class Foo {
////     }
//// }
////
//// const abc = 12;
//// export = abc;
//// export = class AB {}
//// export = {
////     a: 1,
////     b: 1,
////     c: {
////         d: 1
////     }
//// }
////
//// function foo(props: { x: number; y: number }) {}
//// export = foo({ x: 1, y: 1 });

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
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "Foo",
          "kind": "class"
        }
      ]
    },
    {
      "text": "export=",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "export=",
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
      "text": "export=",
      "kind": "function",
      "kindModifiers": "export"
    },
    {
      "text": "export=",
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
      "text": "export=",
      "kind": "class",
      "kindModifiers": "export",
      "childItems": [
        {
          "text": "AB",
          "kind": "class"
        }
      ]
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
      "text": "export=",
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
      "text": "abc",
      "kind": "const"
    },
    {
      "text": "export=",
      "kind": "const",
      "kindModifiers": "export"
    },
    {
      "text": "foo",
      "kind": "function"
    }
  ]
});
