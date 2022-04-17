/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number, qux: number];
////
////let foo: Foo;
////let [bar, baz, qux] = foo;
////let [/*a*/a, /*b*/b, /*c*/c] = foo;
////let [/*d*/d, /*e*/...e] = foo;
////let [/*f*/f, ...[/*g*/g, /*h*/h]] = foo;
////
////type LongFoo = [
////    aLongLongLongLongLongLongLongLongLabel: number,
////    bLongLongLongLongLongLongLongLongLabel: number,
////    cLongLongLongLongLongLongLongLongLabel: number,
////];
////
////let longFoo: LongFoo;
////let [/*i*/i, /*j*/...j] = longFoo;

const [a, b, c, d, e, f, g, h, i, j] = test.markers();
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
        text: 'qux:',
        position: c.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'bar:',
        position: d.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: '[baz, qux]:',
        position: e.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'bar:',
        position: f.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'baz:',
        position: g.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'qux:',
        position: h.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'aLongLongLongLongLongLongLo...:',
        position: i.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: '[bLongLongLongLongLongLongLo..., cLongLongLongLongLongLongLo...]:',
        position: j.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayTupleBindingLabelHints: true,
    includeInlayTupleBindingLabelHintsWhenVariableNameDoesntMatchLabel: true,
});
