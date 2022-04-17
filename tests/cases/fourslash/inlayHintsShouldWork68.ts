/// <reference path="fourslash.ts" />

////type Foo = [bar: number, baz: number];
////
////let foo: Foo = [0, 0];
////foo = [0, 0];
////
////function useFoo(foo: Foo) { }
////useFoo([0, 0]);

verify.getInlayHints([], undefined, {
    includeInlayTupleLiteralLabelHints: false,
});
