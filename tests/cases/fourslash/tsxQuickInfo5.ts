/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// declare function ComponentWithTwoAttributes<K,V>(l: {key1: K, value: V}): JSX.Element;

//// function Baz<T,U>(key1: T, value: U) {
////     let a0 = <ComponentWi/*1*/thTwoAttributes k/*2*/ey1={key1} val/*3*/ue={value} />
////     let a1 = <ComponentWithTwoAttributes {...{key1, value: value}} key="Component" />
//// }

verify.quickInfos({
    1: "function ComponentWithTwoAttributes<T, U>(l: {\n    key1: T;\n    value: U;\n}): any",
    2: "(JSX attribute) key1: T",
    3: "(JSX attribute) value: U",
});
