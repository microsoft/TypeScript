/// <reference path="fourslash.ts" />

////const foo = (a = 1) => class { }
////
////const C1 = class extends foo(/*1*/1) { }
////class C2 extends foo(/*2*/1) { }

const markers = test.markers();

verify.getInlayHints([
    {
        text: 'a:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "literals"
});
