/// <reference path="fourslash.ts" />

//// /**
////  * @param /*1*/
////  */
//// function foo(z: number, a: number) {}

verify.completions({
    marker: "1",
    exact: ["z", "a"], // expected: declaration order
  });

  /**
 * @param |
 */
function foo(z: number, a: number) {}