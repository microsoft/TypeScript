/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// export interface ClickableProps {
////     children?: string;
////     className?: string;
//// }

//// export interface ButtonProps extends ClickableProps {
////     onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
//// }

//// export interface LinkProps extends ClickableProps {
////     to: string;
//// }

//// export function MainButton(buttonProps: ButtonProps): JSX.Element;
//// export function MainButton(linkProps: LinkProps): JSX.Element;
//// export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
////     const linkProps = props as LinkProps;
////     if(linkProps.to) {
////         return this._buildMainLink(props);
////     }
////     return this._buildMainButton(props);
//// }

//// function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
////     return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
//// }

//// declare function buildMainLink({ to, children, className }: LinkProps): JSX.Element;

//// function buildSomeElement1(): JSX.Element {
////     return (
////         <MainB/*1*/utton t/*2*/o='/some/path'>GO</MainButton>
////     );
//// }

//// function buildSomeElement2(): JSX.Element {
////     return (
////         <MainB/*3*/utton onC/*4*/lick={()=>{}}>GO</MainButton>;
////     );
//// }
//// let componenet = <MainButton onClick={()=>{}} ext/*5*/ra-prop>GO</MainButton>;

verify.quickInfos({
    1: "function MainButton(linkProps: LinkProps): JSX.Element (+1 overload)",
    2: "(property) LinkProps.to: string",
    3: "function MainButton(buttonProps: ButtonProps): JSX.Element (+1 overload)",
    4: "(method) ButtonProps.onClick(event?: React.MouseEvent<HTMLButtonElement>): void",
    5: "(property) extra-prop: true"
});
