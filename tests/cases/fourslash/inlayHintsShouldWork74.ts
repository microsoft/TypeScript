/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number, qux: number];
////
////let foo: Foo;
////let [/*a*/bar, /*b*/baz, /*c*/qux] = foo;

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
        text: 'qux:',
        position: c.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayTupleBindingLabelHints: true,
    includeInlayTupleBindingLabelHintsWhenVariableNameDoesntMatchLabel: false,
});
