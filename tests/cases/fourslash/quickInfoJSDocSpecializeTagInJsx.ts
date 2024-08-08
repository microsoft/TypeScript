/// <reference path="fourslash.ts"/>

// @jsx: preserve
// @allowJs: true
// @checkJs: true

// @filename: /a.jsx
//// /**
////  * @template T
////  * @param {object} props
////  * @param {T | undefined} props.value
////  * @returns {null}
////  */
//// function Input(props) {
////     return null;
//// }
////
//// /** @specialize {number} */
//// const el1 = </*1*/Input />;
////
//// // Here, the type argument will be inferred
//// const el2 = </*2*/Input value="abc" />;

verify.quickInfos({
    1: "function Input<number>(props: {\n    value: number;\n}): null",
    2: "function Input<string>(props: {\n    value: string;\n}): null",
});
