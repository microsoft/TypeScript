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
//// /*firstSource*/declare function MainButton(buttonProps: ButtonProps): JSX.Element;
//// /*secondSource*/declare function MainButton(linkProps: LinkProps): JSX.Element;
//// /*thirdSource*/declare function MainButton(props: ButtonProps | LinkProps): JSX.Element;
//// let opt = <Main/*firstTarget*/Button />;
//// let opt = <Main/*secondTarget*/Button children="chidlren" />;
//// let opt = <Main/*thirdTarget*/Button onClick={()=>{}} />;
//// let opt = <Main/*fourthTarget*/Button onClick={()=>{}} ignore-prop />;
//// let opt = <Main/*fivethTarget*/Button goTo="goTo" />;
//// let opt = <Main/*sixthTarget*/Button wrong />;

verify.goToDefinition({
    firstTarget: "thirdSource",
    secondTarget: "thirdSource",
    thirdTarget: "firstSource",
    fourthTarget: "firstSource",
    fivethTarget: "secondSource",
    sixthTarget: "thirdSource"
});
