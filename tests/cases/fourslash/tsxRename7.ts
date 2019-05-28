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
////     [|[|{| "declarationRange": 0 |}propx|]: number|]
////     propString: string
////     optional?: boolean
//// }
//// declare function Opt(attributes: OptionPropBag): JSX.Element;
//// let opt = <Opt />;
//// let opt1 = <Opt [|[|{| "declarationRange": 2 |}propx|]={100}|] propString />;
//// let opt2 = <Opt [|[|{| "declarationRange": 4 |}propx|]={100}|] optional/>;
//// let opt3 = <Opt wrong />;

const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("propx"));
