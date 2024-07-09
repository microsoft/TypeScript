/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// declare function ComponentSpecific<U>(l: {prop: U}): JSX.Element;
//// declare function ComponentSpecific1<U>(l: {prop: U, "ignore-prop": number}): JSX.Element;

//// function Bar<T extends {prop: number}>(arg: T) {
////     let a1 = <Compone/*1*/ntSpecific {...arg} ignore-prop="hi" />;  // U is number
////     let a2 = <ComponentSpecific1 {...arg} ignore-prop={10} />;  // U is number
////     let a3 = <Component/*2*/Specific {...arg} prop="hello" />;   // U is "hello"
//// }

verify.quickInfos({
    1: "function ComponentSpecific<number>(l: {\n    prop: number;\n}): JSX.Element",
    2: "function ComponentSpecific<never>(l: {\n    prop: never;\n}): JSX.Element"
});
