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
//// let opt = <MainButton /*1*/ />;
//// let opt = <MainButton children="chidlren" /*2*/ />;
//// let opt = <MainButton onClick={()=>{}} /*3*/ />;
//// let opt = <MainButton onClick={()=>{}} ignore-prop /*4*/ />;
//// let opt = <MainButton goTo="goTo" /*5*/ />;
//// let opt = <MainButton wrong /*6*/ />;

goTo.marker("1");
verify.completionListContains('children');
verify.completionListContains('className');
verify.completionListContains('onClick');
verify.completionListContains('goTo');

goTo.marker("2");
verify.completionListContains('className');
verify.completionListContains('onClick');
verify.completionListContains('goTo');

goTo.marker("3");
verify.completionListContains('children');
verify.completionListContains('className');
verify.not.completionListContains('goTo');

goTo.marker("4");
verify.completionListContains('children');
verify.completionListContains('className');

goTo.marker("5");
verify.completionListContains('children');
verify.completionListContains('className');
verify.not.completionListContains('onClick');

goTo.marker("6");
verify.completionListContains('children');
verify.completionListContains('className');
verify.completionListContains('onClick');
verify.completionListContains('goTo');