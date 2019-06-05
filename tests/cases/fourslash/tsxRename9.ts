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
//// let opt = <[|MainButton|] />;
//// let opt = <[|MainButton|] children="chidlren" />;
//// let opt = <[|MainButton|] [|[|{| "declarationRangeIndex": 13 |}onClick|]={()=>{}}|] />;
//// let opt = <[|MainButton|] [|[|{| "declarationRangeIndex": 16 |}onClick|]={()=>{}}|] [|ignore-prop|] />;
//// let opt = <[|MainButton|] [|[|{| "declarationRangeIndex": 20 |}goTo|]="goTo"|] />;
//// let opt = <[|MainButton|] [|wrong|] />;

verify.rangesWithSameTextAreRenameLocations(
    "onClick",
    "goTo",
    "MainButton",
    "ignore-prop",
    "wrong"
);