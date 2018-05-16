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

//// function _buildMainButton({ onClick, children, className }: ButtonProps): JSX.Element {
////     return(<button className={className} onClick={onClick}>{ children || 'MAIN BUTTON'}</button>);
//// }

//// export function MainButton(props: ButtonProps): JSX.Element {
////     return this._buildMainButton(props);
//// }
//// let e1 = <MainButton/*1*/ /*2*/

verify.signatureHelp(
    {
        marker: "1",
        text: "MainButton(props: ButtonProps): any",
        parameterSpan: "props: ButtonProps",
    },
    {
        marker: "2",
        text: "MainButton(props: ButtonProps): any",
        parameterSpan: "props: ButtonProps",
    },
);
