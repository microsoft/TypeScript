/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number];
////
////let foo: Foo;
////foo[0];
////foo[1];

verify.getInlayHints([], undefined, {
    includeInlayTupleElementAccessLabelHints: false,
});
