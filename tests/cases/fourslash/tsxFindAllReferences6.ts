/// <reference path='fourslash.ts' />
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
////     propString: string
////     optional?: boolean
//// }
//// declare function Opt(attributes: OptionPropBag): JSX.Element;
//// let opt = <Opt [|{| "isWriteAccess": true, "isDefinition": true |}wrong|] />;

verify.singleReferenceGroup("(property) wrong: true");
