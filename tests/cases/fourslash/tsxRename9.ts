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
////     [|[|{| "declarationRangeIndex": 0 |}onClick|](event?: React.MouseEvent<HTMLButtonElement>): void;|]
//// }
//// interface LinkProps extends ClickableProps {
////     [|[|{| "declarationRangeIndex": 2 |}goTo|]: string;|]
//// }
//// [|declare function [|{| "declarationRangeIndex": 4 |}MainButton|](buttonProps: ButtonProps): JSX.Element;|]
//// [|declare function [|{| "declarationRangeIndex": 6 |}MainButton|](linkProps: LinkProps): JSX.Element;|]
//// [|declare function [|{| "declarationRangeIndex": 8 |}MainButton|](props: ButtonProps | LinkProps): JSX.Element;|]
//// let opt = [|<[|{| "declarationRangeIndex": 10 |}MainButton|] />|];
//// let opt = [|<[|{| "declarationRangeIndex": 12 |}MainButton|] children="chidlren" />|];
//// let opt = [|<[|{| "declarationRangeIndex": 14 |}MainButton|] [|[|{| "declarationRangeIndex": 16 |}onClick|]={()=>{}}|] />|];
//// let opt = [|<[|{| "declarationRangeIndex": 18 |}MainButton|] [|[|{| "declarationRangeIndex": 20 |}onClick|]={()=>{}}|] [|ignore-prop|] />|];
//// let opt = [|<[|{| "declarationRangeIndex": 23 |}MainButton|] [|[|{| "declarationRangeIndex": 25 |}goTo|]="goTo"|] />|];
//// let opt = [|<[|{| "declarationRangeIndex": 27 |}MainButton|] [|wrong|] />|];

verify.rangesWithSameTextAreRenameLocations(
    "onClick",
    "goTo",
    "MainButton",
    "ignore-prop",
    "wrong"
);