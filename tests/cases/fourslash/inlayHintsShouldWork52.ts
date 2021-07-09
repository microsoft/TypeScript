/// <reference path="fourslash.ts" />

//// function foo (aParameter: number, bParameter: number, cParameter: number)/*f*/ { }

//// foo(
////     /** aParameter */
////     1,
////     // bParameter
////     /*a*/2,
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
////     /*b*/3
//// )

//// foo(
////     /** wrong name */
////     /*c*/1,
////     /*d*/2,
////     /** multiple */
////     /** wrong */
////     /** name */
////     /*e*/3
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
        text: 'bParameter:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'cParameter:',
        position: markers[2].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'aParameter:',
        position: markers[3].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'bParameter:',
        position: markers[4].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'cParameter:',
        position: markers[5].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals",
    includeInlayFunctionLikeReturnTypeHints: true
});
