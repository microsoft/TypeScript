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
////     [|{| "isWriteAccess": true, "isDefinition": true |}propx|]: number
////     propString: string
////     optional?: boolean
//// }
//// declare function Opt(attributes: OptionPropBag): JSX.Element;
//// let opt = <Opt />;
//// let opt1 = <Opt [|{| "isWriteAccess": true, "isDefinition": true |}propx|]={100} propString />;
//// let opt2 = <Opt [|{| "isWriteAccess": true, "isDefinition": true |}propx|]={100} optional/>;
//// let opt3 = <Opt wrong />;

verify.singleReferenceGroup("(property) OptionPropBag.propx: number");
