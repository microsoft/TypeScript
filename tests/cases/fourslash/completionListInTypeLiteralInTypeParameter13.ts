/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: a.tsx
////interface Foo {
////    one: string;
////    two: number;
////}
////
////const Component = <T extends Foo>() => <></>;
////
////<Component<{/*0*/}>></Component>;
////<Component<{/*1*/}>/>;

verify.completions(
  { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true },
  { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: true },
);
