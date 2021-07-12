/// <reference path="fourslash.ts" />

//// function foo (v: any) {}

//// foo(/*a*/1);
//// foo(/*b*/'');
//// foo(/*c*/true);
//// foo(/*d*/() => 1);
//// foo(/*e*/function () { return 1 });
//// foo(/*f*/{});
//// foo(/*g*/{ a: 1 });
//// foo(/*h*/[]);
//// foo(/*i*/[1]);

//// foo(foo);
//// foo(/*j*/(1));
//// foo(foo(/*k*/1));

const markers = test.markers();

verify.getInlayHints(
    markers.map(m => ({
        text: 'v:',
        position: m.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    })) , undefined, {
    includeInlayParameterNameHints: "literals"
});