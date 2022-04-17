/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number, qux: number];
////
////let foo: Foo;
////let [bar, baz, qux] = foo;
////let [a, b, c] = foo;
////let [d, ...e] = foo;
////let [f, ...[g, h]] = foo;

verify.getInlayHints([], undefined, {
    includeInlayTupleBindingLabelHints: false,
    includeInlayTupleBindingLabelHintsWhenVariableNameDoesntMatchLabel: true,
});
verify.getInlayHints([], undefined, {
    includeInlayTupleBindingLabelHints: false,
    includeInlayTupleBindingLabelHintsWhenVariableNameDoesntMatchLabel: false,
});
