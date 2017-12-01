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
//// declare function MainButton(buttonProps: ButtonProps): JSX.Element;
//// declare function MainButton(linkProps: LinkProps): JSX.Element;
//// declare function MainButton(props: ButtonProps | LinkProps): JSX.Element;
//// let opt = <MainButton [|wrong|] />;  // r1

const [r1] = test.ranges();
verify.referencesOf(r1, [r1]);