/// <reference path="fourslash.ts" />

// @jsx: preserve
// @filename: a.tsx
////const Component1 = <T extends { x: 'one' | 'two' }>() => <></>;
////const Component2 = <T extends 'one' | 'two'>() => <></>;
////
////<Component1<{ x: '/*0*/' }>></Component>;
////<Component1<{ x: '/*1*/' }>/>;
////<Component2<'/*2*/'>></Component>;
////<Component2<'/*3*/'>/>;

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "2", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "3", unsorted: ["one", "two"], isNewIdentifierLocation: false },
);
