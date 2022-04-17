/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number];
////
////let foo: Foo;
////foo[/*a*/0];
////foo[/*b*/1];
////
////type LongFoo = [longLongLongLongLongLongLongLongLabel: number];
////
////let longFoo: LongFoo;
////longFoo[/*c*/0];

const [a, b, c] = test.markers();
verify.getInlayHints([
    {
        text: 'bar:',
        position: a.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'baz:',
        position: b.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'longLongLongLongLongLongLon...:',
        position: c.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayTupleElementAccessLabelHints: true,
});
