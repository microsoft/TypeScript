/// <reference path="fourslash.ts" />

// issue: https://github.com/microsoft/TypeScript/issues/54729
// Tests that `isCompletionListBlocker` is true at position 1, but false after a newline.

////const obj = {
////  name: '',
////} as const /*1*/
/////*2*/

verify.completions(
  { marker: "1", exact: undefined },
  {
    marker: "2",
    exact: completion.globalsPlus([
      {
        name: "obj",
      },
    ]),
  }
);
