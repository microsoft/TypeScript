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
//// [|declare function [|{| "declarationRangeIndex": 0 |}Opt|](attributes: OptionPropBag): JSX.Element;|]
//// let opt = [|<[|{| "declarationRangeIndex": 2 |}Opt|] />|];
//// let opt1 = [|<[|{| "declarationRangeIndex": 4 |}Opt|] propx={100} propString />|];
//// let opt2 = [|<[|{| "declarationRangeIndex": 6 |}Opt|] propx={100} optional/>|];
//// let opt3 = [|<[|{| "declarationRangeIndex": 8 |}Opt|] wrong />|];
//// let opt4 = [|<[|{| "declarationRangeIndex": 10 |}Opt|] propx={100} propString="hi" />|];

verify.rangesWithSameTextAreRenameLocations("Opt");
