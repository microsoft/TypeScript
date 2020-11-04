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
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}MainButton|](buttonProps: ButtonProps): JSX.Element;|]
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}MainButton|](linkProps: LinkProps): JSX.Element;|]
//// [|declare function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}MainButton|](props: ButtonProps | LinkProps): JSX.Element;|]
//// let opt = [|<[|{| "contextRangeIndex": 6 |}MainButton|] />|];
//// let opt = [|<[|{| "contextRangeIndex": 8 |}MainButton|] children="chidlren" />|];
//// let opt = [|<[|{| "contextRangeIndex": 10 |}MainButton|] onClick={()=>{}} />|];
//// let opt = [|<[|{| "contextRangeIndex": 12 |}MainButton|] onClick={()=>{}} ignore-prop />|];
//// let opt = [|<[|{| "contextRangeIndex": 14 |}MainButton|] goTo="goTo" />|];
//// let opt = [|<[|{| "contextRangeIndex": 16 |}MainButton|] wrong />|];

verify.singleReferenceGroup(
    "function MainButton(buttonProps: ButtonProps): JSX.Element (+2 overloads)",
    "MainButton"
);
