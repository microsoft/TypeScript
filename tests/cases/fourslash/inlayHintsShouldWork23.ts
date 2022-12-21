/// <reference path="fourslash.ts" />

//// function foo (Im_very_very_very_very_very_very_very_long: number) {}
//// foo(/*a*/1);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'Im_very_very_very_very_very...:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
