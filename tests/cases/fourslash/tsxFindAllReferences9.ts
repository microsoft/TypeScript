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
////     [|{| "isWriteAccess": true, "isDefinition": true |}goTo|]: string;
//// }
//// declare function MainButton(buttonProps: ButtonProps): JSX.Element;
//// declare function MainButton(linkProps: LinkProps): JSX.Element;
//// declare function MainButton(props: ButtonProps | LinkProps): JSX.Element;
//// let opt = <MainButton />;
//// let opt = <MainButton children="chidlren" />;
//// let opt = <MainButton onClick={()=>{}} />;
//// let opt = <MainButton onClick={()=>{}} ignore-prop />;
//// let opt = <MainButton [|{| "isWriteAccess": true, "isDefinition": true |}goTo|]="goTo" />;
//// let opt = <MainButton [|{| "isWriteAccess": true, "isDefinition": true |}goTo|] />;
//// let opt = <MainButton wrong />;

verify.singleReferenceGroup("(property) LinkProps.goTo: string");
