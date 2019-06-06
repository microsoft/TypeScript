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
////     onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
//// }
//// interface LinkProps extends ClickableProps {
////     goTo: string;
//// }
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}MainButton|](buttonProps: ButtonProps): JSX.Element;|]
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}MainButton|](linkProps: LinkProps): JSX.Element;|]
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 4 |}MainButton|](props: ButtonProps | LinkProps): JSX.Element;|]
//// let opt = [|<[|{| "declarationRangeIndex": 6 |}MainButton|] />|];
//// let opt = [|<[|{| "declarationRangeIndex": 8 |}MainButton|] children="chidlren" />|];
//// let opt = [|<[|{| "declarationRangeIndex": 10 |}MainButton|] onClick={()=>{}} />|];
//// let opt = [|<[|{| "declarationRangeIndex": 12 |}MainButton|] onClick={()=>{}} ignore-prop />|];
//// let opt = [|<[|{| "declarationRangeIndex": 14 |}MainButton|] goTo="goTo" />|];
//// let opt = [|<[|{| "declarationRangeIndex": 16 |}MainButton|] wrong />|];

verify.singleReferenceGroup(
    "function MainButton(buttonProps: ButtonProps): JSX.Element (+2 overloads)",
    "MainButton"
);
