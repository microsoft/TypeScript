/// <reference path="fourslash.ts" />

////type FooA = [type: 'a', bar: number, baz: number];
////type FooB = [type: 'b', qux: number];
////type Foo = FooA | FooB;
////
////let foo: Foo;
////foo[/*a*/1];
////foo[/*b*/2];
////
////switch(foo[/*c*/0]) {
////    case "a":
////        foo[/*d*/1];
////        foo[/*e*/2];
////        break;
////    case "b":
////        foo[/*f*/1];
////        break;
////}
////
////type LongFooA = [aLongLongLongLongLongLongLongLongLabel: number];
////type LongFooB = [bLongLongLongLongLongLongLongLongLabel: number];
////type LongFoo = LongFooA | LongFooB;
////
////let longFoo: LongFoo;
////longFoo[/*g*/0];

const [a, b, c, d, e, f, g] = test.markers();
verify.getInlayHints([
    {
        text: 'bar | qux:',
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
        text: 'type:',
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
        text: 'baz:',
        position: e.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'qux:',
        position: f.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
    {
        text: 'aLongLongLongLongLongLongLo... | bLongLongLongLongLongLongLo...:',
        position: g.position,
        kind: ts.InlayHintKind.Tuple,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayTupleElementAccessLabelHints: true,
});
