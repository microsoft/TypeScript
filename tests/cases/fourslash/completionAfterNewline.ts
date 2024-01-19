/// <reference path="fourslash.ts" />

// issue: https://github.com/microsoft/TypeScript/issues/54729
// Tests that `isCompletionListBlocker` returns true at position 1, and returns false after a newline.


////let foo /*1*/
/////*2*/
/////*3*/

verify.completions(
  { marker: "1", exact: undefined },
  {
    marker: ["2", "3"],
    exact: completion.globalsPlus([
      {
        name: "foo",
      },
    ]),
  }
);
