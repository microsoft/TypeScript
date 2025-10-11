/// <reference path="fourslash.ts" />

////interface Foo {
////    kind: 'foo';
////    one: string;
////}
////interface Bar {
////    kind: 'bar';
////    two: number;
////}
////
////declare function a<T extends Foo>(): void
////declare function a<T extends Bar>(): void
////a<{ kind: 'bar', /*0*/ }>();
////
////declare function b<T extends Foo>(kind: 'foo'): void
////declare function b<T extends Bar>(kind: 'bar'): void
////b<{/*1*/}>('bar');

// The completion lists are unfortunately not narrowed here (ideally only
// properties of `Bar` would be suggested).
verify.completions(
  { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true },
  { marker: "1", unsorted: ["kind", "one", "two"], isNewIdentifierLocation: true },
);
