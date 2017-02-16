/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// interface OptionPropBag {
////     propx: number
////     propString: "hell"
////     optional?: boolean
//// }
//// declare function Opt(attributes: OptionPropBag): JSX.Element;
//// let opt = <Opt /*1*/ />;
//// let opt1 = <Opt prop/*2*/ />;
//// let opt2 = <Opt propx={100} /*3*/ />;
//// let opt3 = <Opt propx={100} optional /*4*/ />;
//// let opt4 = <Opt wrong /*5*/ />;

goTo.marker("1");
verify.completionListContains('propx');
verify.completionListContains('propString');
verify.completionListContains('optional');

goTo.marker("2");
verify.completionListContains('propx');
verify.completionListContains('propString');

goTo.marker("3");
verify.completionListContains("propString")
verify.completionListContains("optional")
verify.not.completionListContains("propx")

goTo.marker("4");
verify.completionListContains("propString");
verify.not.completionListContains("propx");
verify.not.completionListContains("optional");

goTo.marker("5");
verify.completionListContains('propx');
verify.completionListContains('propString');
verify.completionListContains('optional');