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
//// interface ClickableProps {
////     children?: string;
////     className?: string;
//// }
//// interface ButtonProps extends ClickableProps {
////     [|[|{| "contextRangeIndex": 0 |}onClick|](event?: React.MouseEvent<HTMLButtonElement>): void;|]
//// }
//// interface LinkProps extends ClickableProps {
////     [|[|{| "contextRangeIndex": 2 |}goTo|]: string;|]
//// }
//// [|declare function [|{| "contextRangeIndex": 4 |}MainButton|](buttonProps: ButtonProps): JSX.Element;|]
//// [|declare function [|{| "contextRangeIndex": 6 |}MainButton|](linkProps: LinkProps): JSX.Element;|]
//// [|declare function [|{| "contextRangeIndex": 8 |}MainButton|](props: ButtonProps | LinkProps): JSX.Element;|]
//// let opt = [|<[|{| "contextRangeIndex": 10 |}MainButton|] />|];
//// let opt = [|<[|{| "contextRangeIndex": 12 |}MainButton|] children="chidlren" />|];
//// let opt = [|<[|{| "contextRangeIndex": 14 |}MainButton|] [|[|{| "contextRangeIndex": 16 |}onClick|]={()=>{}}|] />|];
//// let opt = [|<[|{| "contextRangeIndex": 18 |}MainButton|] [|[|{| "contextRangeIndex": 20 |}onClick|]={()=>{}}|] [|ignore-prop|] />|];
//// let opt = [|<[|{| "contextRangeIndex": 23 |}MainButton|] [|[|{| "contextRangeIndex": 25 |}goTo|]="goTo"|] />|];
//// let opt = [|<[|{| "contextRangeIndex": 27 |}MainButton|] [|wrong|] />|];

verify.baselineRenameAtRangesWithText([
    "onClick",
    "goTo",
    "MainButton",
    "ignore-prop",
    "wrong"
]);