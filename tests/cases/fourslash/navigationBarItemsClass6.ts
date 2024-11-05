/// <reference path="fourslash.ts"/>

////function Z() { }
////
////Z.foo = 42
////
////class Z { }

verify.navigationTree({
  text: "<global>",
  kind: "script",
  childItems: [
    {
      text: "Z",
      kind: "class",
      childItems: [
        {
          text: "constructor",
          kind: "constructor"
        },
        {
          text: "foo"
        }
      ]
    },
    {
      text: "Z",
      kind: "class"
    }
  ]
});
