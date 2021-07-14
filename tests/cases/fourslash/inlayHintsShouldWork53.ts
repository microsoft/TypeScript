/// <reference path="fourslash.ts" />

//// const fn = (x: any) => { }
//// fn(/* nobody knows exactly what this param is */ /*a*/42);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'x:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
