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
//// [|declare function [|{| "contextRangeIndex": 0 |}Opt|](attributes: OptionPropBag): JSX.Element;|]
//// let opt = [|<[|{| "contextRangeIndex": 2 |}Opt|] />|];
//// let opt1 = [|<[|{| "contextRangeIndex": 4 |}Opt|] propx={100} propString />|];
//// let opt2 = [|<[|{| "contextRangeIndex": 6 |}Opt|] propx={100} optional/>|];
//// let opt3 = [|<[|{| "contextRangeIndex": 8 |}Opt|] wrong />|];
//// let opt4 = [|<[|{| "contextRangeIndex": 10 |}Opt|] propx={100} propString="hi" />|];

verify.baselineRenameAtRangesWithText("Opt");
