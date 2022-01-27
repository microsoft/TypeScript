/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// interface OptionProp {
////     propx: 2
//// }

//// class Opt extends React.Component<OptionProp, {}> {
////     render() {
////         return <div>Hello</div>;
////     }
//// }

//// const obj1: OptionProp = {
////     propx: 2
//// }

//// let y1 = <O/*1*/pt pro/*2*/px={2} />;
//// let y2 = <Opt {...ob/*3*/j1} />;
//// let y2 = <Opt {...obj1} pr/*4*/opx />;

verify.quickInfos({
    1: "class Opt",
    2: "(property) propx: number",
    3: "const obj1: OptionProp",
    4: "(property) propx: true"
});
