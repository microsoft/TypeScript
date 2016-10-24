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
////         <MainB/*3*/utton onC/*4*/lick={()=>{}}>GO</MainButton>
////     );
//// }

verify.quickInfos({
    1: "function MainButton(linkProps: LinkProps): JSX.Element (+1 Overload)",
    2: "(attribute) LinkProps.to: string",
    3: "function MainButton(buttonProps: ButtonProps): JSX.Element (+1 Overload)",
    4: "(attribute) ButtonProps.onClick: ()=>void",
});
