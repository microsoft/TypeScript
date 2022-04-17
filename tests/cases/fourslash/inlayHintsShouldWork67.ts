/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number];
////
////let foo: Foo = [/*a*/0, /*b*/0];
////foo = [/*c*/0, /*d*/0];
////
////function useFoo(foo: Foo) { }
////useFoo([/*e*/0, /*f*/0]);
////
////type LongFoo = [longLongLongLongLongLongLongLongLabel: number];
////
////let longFoo: LongFoo = [/*g*/0];

const [a, b, c, d, e, f, g] = test.markers();
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
        text: 'bar:',
        position: c.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'baz:',
        position: d.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'bar:',
        position: e.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'baz:',
        position: f.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'longLongLongLongLongLongLon...:',
        position: g.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayTupleLiteralLabelHints: true,
});
