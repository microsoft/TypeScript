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

const [
    onClickDef_0, onClick_1,
    goToDef_2, goTo_3,
    mainButtonDef_4, mainButton_5,
    mainButtonDef_6, mainButton_7,
    mainButtonDef_8, mainButton_9,
    mainButton_10,
    mainButton_11,
    mainButton_12, onClickDef_13, onClick_14,
    mainButton_15, onClickDef_16, onClick_17, ignoreProp_18,
    mainButton_19, goToDef_20, goTo_21,
    mainButton_22, wrong_23
] = test.ranges();
const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("onClick"));
verify.rangesAreRenameLocations(rangesByText.get("goTo"));
verify.rangesAreRenameLocations(rangesByText.get("MainButton"));
verify.rangesAreRenameLocations(rangesByText.get("ignore-prop"));
verify.rangesAreRenameLocations(rangesByText.get("wrong"));