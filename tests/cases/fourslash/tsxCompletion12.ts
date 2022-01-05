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

verify.completions(
    {
        marker: ["1", "2", "5"],
        exact: [
            "propString",
            "propx",
            { name: "optional", kind: "JSX attribute", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
        ]
    },
    {
        marker: "3",
        exact: [
            "propString",
            { name: "optional", kind: "JSX attribute", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
        ]
    },
    { marker: "4", exact: "propString" },
);
