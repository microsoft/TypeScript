/// <reference path="fourslash.ts" />

//// function foo (aParameter: number, bParameter: number, cParameter: number)/*f*/ { }

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
////     /*a*/1,
////     /*b*/2,
////     /** multiple */
////     /** wrong */
////     /** name */
////     /*c*/3
//// )


const markers = test.markers();
verify.getInlayHints([
    {
        text: ': void',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: 'aParameter:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'bParameter:',
        position: markers[2].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'cParameter:',
        position: markers[3].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: true,
    includeInlayFunctionLikeReturnTypeHints: true
});
