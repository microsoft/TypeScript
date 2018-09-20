/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

//// import React = require('react');
//// export interface ClickableProps {
////     children?: string;
////     className?: string;
//// }

//// export interface ButtonProps extends ClickableProps {
////     onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
//// }

//// export interface LinkProps extends ClickableProps {
////     goTo(where: "home" | "contact"): void;
//// }

//// function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
////     return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
//// }

//// export function MainButton(buttonProps: ButtonProps): JSX.Element;
//// export function MainButton(linkProps: LinkProps): JSX.Element;
//// export function MainButton(props: ButtonProps | LinkProps): JSX.Element {
////     return this._buildMainButton(props);
//// }
//// let e1 = <MainButton/*1*/ /*2*/

verify.signatureHelp({
    marker: ["1", "2"],
    overloadsCount: 2,
    text: "MainButton(buttonProps: ButtonProps): any",
    parameterSpan: "buttonProps: ButtonProps",
});
