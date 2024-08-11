/// <reference path="fourslash.ts" />

//// const fn = (x: any) => { }
//// fn(/* nobody knows exactly what this param is */ 42);

//// function foo (aParameter: number, bParameter: number, cParameter: number) { }

//// foo(
////     /** aParameter */
////     1,
////     // bParameter
////     2,
////     /* cParameter */
////     3
//// )

//// foo(
////     /** multiple comments */
////     /** aParameter */
////     1,
////     /** bParameter */
////     /** multiple comments */
////     2,
////     // cParameter
////     /** multiple comments */
////     3
//// )

//// foo(
////     /** wrong name */
////     1,
////     2,
////     /** multiple */
////     /** wrong */
////     /** name */
////     3
//// )

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
